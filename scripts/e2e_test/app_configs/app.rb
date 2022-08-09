class App
  CACHE_DIR = File.expand_path(__dir__ + '/../cache')

  def initialize(name, root_dir)
    @name = name
    @root_dir = root_dir
  end

  def setup!
    announce! "Creating next #{@name} app in #{@root_dir}", "⚙️"
    FileUtils.mkdir_p(@root_dir)

    use_cache do
      yarn_create!
      # prompt to save to cache?
      verify!
    end

    yalc_add_mailing!
    run_mailing!
  end

private
  def use_cache(&block)
    framework_cache_dir = File.join(CACHE_DIR, @name)
    if Dir.exist?(framework_cache_dir)
      puts "Using cache..."
      FileUtils.cp_r(framework_cache_dir + '/.', @root_dir)
      
      verify!
    end
  end

  def verify!
    fail "missing package.json in #{@root_dir}" unless File.exist?(File.join(@root_dir, "package.json"))
  end

  def yalc_add_mailing!
    Dir.chdir(@root_dir) do
      ## add mailing to the project
      system("npx yalc add mailing")
    end
  end

  def run_mailing!
    Dir.chdir(@root_dir) do
      # open the subprocess
      ## TODO: fail if npx mailing exits right away
      @io = IO.popen("npx mailing --quiet --typescript --emails-dir=\"./emails\"")
    end

    # wait for the preview server to start
    wait_for_preview_server!
    wait_for_previews_json!
  end

  def wait_for_preview_server!
    @io.select do |line|
      break if line =~ %r{Running preview at http://localhost:3883/}
    end
  end

  def wait_for_previews_json!
    # N.B. currently takes about 4 seconds for to load previews.json the first time in a Next.js js (non-ts) app,
    # which causes the cypress tests to falsely fail (blank page while previews.json is loading).
    # If we can speed up the uncached previews.json load then this wait can likely be removed
    # see: https://github.com/sofn-xyz/mailing/issues/102

    curl_exit_code = system_quiet("curl http://localhost:3883/previews.json")
    fail "curl http://localhost:3883/previews.json did not succeed" unless curl_exit_code
  end
end