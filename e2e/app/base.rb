# frozen_string_literal: true

require 'net/http'
require 'fileutils'
require 'json'
require_relative '../helpers/system_utils'
require_relative '../config'

module App
  class Base
    include SystemUtils

    attr_reader :root_dir

    def initialize(name, root_dir, opts)
      @name = name
      @root_dir = root_dir
      @save_cache = opts[:save_cache]
    end

    def setup!
      announce! "Creating new #{@name} app in #{@root_dir}", '⚙️'
      ::FileUtils.mkdir_p(@root_dir)

      use_cache do
        yarn_create!
        yarn_add_test_dependencies!
        verify_package_json_exists!
        add_ci_scripts!
      end

      yalc_add_packages!
      yarn!
    end

    def run_mailing
      io = nil

      begin
        puts 'Running mailing'
        mailing_command = -> { IO.popen('MM_E2E=1 npx mailing --quiet') }

        Dir.chdir(@root_dir) do
          io = in_subdir(mailing_command)
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

    def in_subdir(lam)
      if @sub_dir
        Dir.chdir(@sub_dir) do
          lam.call
        end
      else
        lam.call
      end
    end

    def use_cache(&block)
      framework_cache_dir = File.join(Config::CACHE_DIR, @name)
      if Dir.exist?(framework_cache_dir)
        puts "Using cached #{@name}..."
        ::FileUtils.cp_r("#{framework_cache_dir}/.", @root_dir)
      else
        block.call

        if @save_cache
          verify_package_json_exists!
          ::FileUtils.cp_r(@root_dir, File.join(Config::CACHE_DIR, @name))
        end
      end
    end

    def verify_package_json_exists!
      raise "missing package.json in #{@root_dir}" unless File.exist?(File.join(@root_dir, 'package.json'))
    end

    ## yalc add mailing and mailing-cor to the project
    def yalc_add_packages!
      puts 'Adding mailing and mailing-core via yalc'

      yalc_command = -> { system_quiet('npx yalc add --dev mailing mailing-core') }

      Dir.chdir(@root_dir) do
        in_subdir(yalc_command)
      end
    end

    def yarn_add_test_dependencies!
      puts "yarn add'ing dependencies required for  tests"
      Dir.chdir(@root_dir) do
        system_quiet('yarn add --dev jest @babel/preset-env cypress')
      end
    end

    def yarn!
      puts 'Running yarn'
      Dir.chdir(@root_dir) do
        system_quiet('yarn')
      end
    end

    def add_ci_scripts!
      Dir.chdir(@root_dir) do
        package_json = JSON.parse(File.read('package.json'))
        package_json['scripts'] ||= []
        package_json['scripts']['ci:mailing:nohup'] = 'MM_E2E=1 nohup npx mailing --quiet 2>&1 &'
        File.write('package.json', JSON.pretty_generate(package_json))
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
