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

    verify_package_json_exists!

    yalc_add_mailing!
    yarn!
    yarn_add_dependencies!
    run_mailing!
  end

private
  def use_cache(&block)
    framework_cache_dir = File.join(CACHE_DIR, @name)
    if Dir.exist?(framework_cache_dir)
      puts "Using cached #{@name}..."
      FileUtils.cp_r(framework_cache_dir + '/.', @root_dir)
    else
      block.call

      if @save_cache
        verify_package_json_exists!
        FileUtils.cp_r(@root_dir, File.join(CACHE_DIR, @name))
      end
    end
  end

  def verify_package_json_exists!
    fail "missing package.json in #{@root_dir}" unless File.exist?(File.join(@root_dir, "package.json"))
  end

  ## add mailing to the project
  def yalc_add_mailing!
    puts "Adding mailing via yalc"
    Dir.chdir(@root_dir) do
      system_quiet("npx yalc add --dev mailing")
    end
  end
  
  def yarn!
    puts "Running yarn"
    Dir.chdir(@root_dir) do
      system_quiet("yarn")
    end
  end
  
  def yarn_add_dependencies!
    puts "Adding mailing dependencies"
    Dir.chdir(@root_dir) do
      system_quiet("yarn add mailing-core mjml mjml-react nodemailer &&\
        yarn add --dev @types/mjml @types/mjml-react @types/nodemailer")
    end
  end

  def run_mailing!
    puts "Running mailing"
    Dir.chdir(@root_dir) do
      # open the subprocess
      @io = IO.popen("npx mailing --quiet")
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