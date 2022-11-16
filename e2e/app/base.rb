# frozen_string_literal: true

require 'net/http'
require 'fileutils'
require 'json'
require_relative '../helpers/system_utils'
require_relative '../config'

module App
  class Base
    include SystemUtils

    attr_reader :root_dir, :name

    def initialize(name, root_dir, opts)
      @name = name
      @root_dir = root_dir
      @save_cache = opts[:save_cache]
    end

    def install_dir
      @root_dir
    end

    def use_cache(&block)
      framework_cache_dir = File.join(Config::CACHE_DIR, @name)
      if Dir.exist?(framework_cache_dir)
        puts "Using cached #{@name}..."
        FileUtils.cp_r("#{framework_cache_dir}/.", @root_dir)
      else
        block.call

        if @save_cache
          verify_package_json_exists!
          FileUtils.cp_r(@root_dir, File.join(Config::CACHE_DIR, @name))
        end
      end
    end

    def setup!
      announce! "Creating new #{name} app in #{root_dir}", '⚙️'
      ::FileUtils.mkdir_p(root_dir)

      use_cache do
        yarn_create!
        verify_package_json_exists!
        yarn_add_test_dependencies!
        add_yarn_ci_scripts!
      end

      yalc_add_packages!
      yarn!
      copy_ci_scripts!
      intialize_mailing!
      verify_typescript!
    end

    def run_mailing
      io = nil

      begin
        puts 'Running mailing'
        Dir.chdir(install_dir) do
          io = IO.popen('MM_E2E=1 npx mailing --quiet')
          # wait for the preview server to start
          wait_for_previews_json!
          # run commands in the app dir
          yield
        end
      ensure
        # Cleanup IO And Subprocesses
        raise 'No subprocess found to cleanup' unless io

        # kill the subprocess
        Process.kill 'INT', io.pid
        # close the io
        io.close
        io = nil
      end
    end

    private

    def yarn_create!
      raise 'Subclasses must implement this method'
    end

    def verify_package_json_exists!
      raise "missing package.json in #{root_dir}" unless File.exist?(File.join(root_dir, 'package.json'))
    end

    def verify_typescript!
      return unless @typescript

      mailing_config_json = File.join(root_dir, 'mailing.config.json')
      raise 'missing mailing.config.json' unless File.exist?(mailing_config_json)

      json = JSON.parse(File.read(mailing_config_json))
      return if json['typescript']

      warn <<-STR
        * * * * * * * * * * * * * * * * *
        ⚠️ WARNING ⚠️ Expected mailing.config.json to have 'typescript' set to true but it was not!\n
        In other words, mailing init did not correctly detect that this is a typescript project\n
        Please implement https://github.com/sofn-xyz/mailing/issues/338 and then have this raise an error instead or move this check to a jest test\n
        Until #338 is implemented, the e2e tests will override this by passing the --typescript flag to `npx mailing init` in typescript frameworks.
        * * * * * * * * * * * * * * * * *
      STR
    end

    ## yalc add mailing and mailing-cor to the project
    def yalc_add_packages!
      puts 'Adding mailing and mailing-core via yalc'
      Dir.chdir(install_dir) do
        system_quiet('npx yalc add --dev mailing mailing-core')
      end
    end

    def yarn_add_test_dependencies!
      puts "yarn add'ing dependencies required for tests"
      Dir.chdir(install_dir) do
        system_quiet('yarn add --dev @babel/preset-env jest cypress')
      end
    end

    def yarn!
      puts 'Running yarn'
      Dir.chdir(root_dir) do
        system_quiet('yarn')
      end

      return if root_dir == install_dir

      Dir.chdir(install_dir) do
        system_quiet('yarn')
      end
    end

    def add_yarn_ci_scripts!
      puts 'Adding CI scripts'
      Dir.chdir(install_dir) do
        package_json = JSON.parse(File.read('package.json'))
        package_json['scripts'] ||= {}
        package_json['scripts']['ci:mailing:nohup'] = 'MM_E2E=1 nohup npx mailing --quiet 2>&1 &'
        File.write('package.json', JSON.pretty_generate(package_json))
      end
    end

    # Copy test files into app
    def copy_ci_scripts!
      puts 'Copying test configs into App'
      ::FileUtils.cp_r(Config::MAILING_TESTS_DIR, install_dir)
    end

    # Initialize the mailing app
    def intialize_mailing!
      Dir.chdir(install_dir) do
        puts 'Initializing Mailing'
        mailing_cmd = 'MM_E2E=1 npx mailing --quiet --scaffold-only'

        ## Override the typescript flag specified in mailing.config.json
        ## This should be removed when https://github.com/sofn-xyz/mailing/issues/338 is implemented
        ## (see warning message above)
        mailing_cmd += ' --typescript' if @typescript

        system(mailing_cmd)
      end
    end

    def wait_for_previews_json!
      # N.B. currently takes about 4 seconds for to load the preview json the first time in a Next.js js (non-ts) app,
      # which causes the cypress tests to falsely fail (blank page while previews.json is loading).
      # If we can speed up the uncached previews json load then this wait can likely be removed
      # see: https://github.com/sofn-xyz/mailing/issues/102

      uri = URI('http://localhost:3883/api/previews')
      tries = 0

      loop do
        begin
          res = Net::HTTP.get_response(uri)
          break if res.code == '200'
          raise "HTTP Get #{uri} did not succeed after #{tries} tries, status code was #{res.code}" if tries > 10
        rescue Errno::ECONNREFUSED
          raise "HTTP Get #{uri} did not succeed after #{tries} tries" if tries > 10
        end

        tries += 1
        sleep 1
      end
    end
  end
end
