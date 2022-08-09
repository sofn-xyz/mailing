require 'net/http'

class App
  CACHE_DIR = File.expand_path(__dir__ + '/../cache')

  attr_reader :io

  def initialize(name, root_dir, opts)
    @name = name
    @root_dir = root_dir
    @save_cache = opts[:save_cache]
  end

  def setup!
    announce! "Creating new #{@name} app in #{@root_dir}", "⚙️"
    FileUtils.mkdir_p(@root_dir)

    use_cache do
      yarn_create!
    end

    verify!

    yalc_add_mailing!
    run_mailing!
  end

private
  def use_cache(&block)
    framework_cache_dir = File.join(CACHE_DIR, @name)
    if Dir.exist?(framework_cache_dir)
      puts "Using cache..."
      FileUtils.cp_r(framework_cache_dir + '/.', @root_dir)
    else
      block.call

      if @save_cache
        verify!
        FileUtils.cp_r(@root_dir, CACHE_DIR)
      end
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

    uri = URI('http://localhost:3883/previews.json')
    res = Net::HTTP.get_response(uri)
    fail "HTTP Get #{uri} did not succeed" unless '200' == res.code
  end
end