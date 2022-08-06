# frozen_string_literal: true

require 'tmpdir'
require 'json'

class TestRunner
  NUM_RUNS_TO_KEEP = 5
  PROJECT_ROOT = File.expand_path(__dir__ + '/../..') 
  RUNS_DIR = File.expand_path(__dir__ + '/runs')
  CYPRESS_DIR = File.join(PROJECT_ROOT, 'packages/cli/cypress')

  E2E_CONFIG = [
    {
      name: 'next_ts',
      command: "yarn create next-app . --typescript > /dev/null",
    },
    {
      name: 'next_js',
      command: "yarn create next-app . > /dev/null"
    },
    {
      name: 'redwood_ts',
      command: "yarn create redwood-app . --typescript > /dev/null; touch yarn.lock; yarn > /dev/null",
    },
    {
      name: 'redwood_js',
      command: "yarn create redwood-app . > /dev/null; touch yarn.lock; yarn"
    },
  ];

  def initialize
    fail "Check that PROJECT_ROOT exists: #{PROJECT_ROOT}" unless Dir.exists?(PROJECT_ROOT)
    
    package_json_file = File.join(PROJECT_ROOT, 'package.json')
    fail "Check that PROJECT_ROOT is the project root: #{PROJECT_ROOT}" unless File.exists?(package_json_file) && 'mailing-monorepo' == JSON::parse(File.read(package_json_file))['name']
    fail "Check that CYPRESS_DIR exists: #{CYPRESS_DIR}" unless Dir.exists?(CYPRESS_DIR)
  end

  def build_mailing
    Dir.chdir(PROJECT_ROOT) do
      system("yalc remove")
      system("yalc add")
      system("yarn build > /dev/null")
      system("yalc push")
    end
  end

  def run
    @timestamp_dir = Time.now.strftime("%Y%m%d%H%M%S")

    # TODO: add a 'skip-build' option to CLI for faster test runs
    build_mailing

    # TODO: add a `framework=` option to specify an individual framework to run
    E2E_CONFIG.each do |config|
      begin
        tmp_dir_name = File.join(RUNS_DIR, @timestamp_dir, config[:name])

        puts "⚙️  " * 10
        puts "Attempting #{config[:name]} in #{tmp_dir_name}"
        puts "⚙️  " * 10

        FileUtils.mkdir_p(tmp_dir_name)

        Dir.chdir(tmp_dir_name) do
          # run the bootstrap command
          system(config[:command])

          ## add mailing to the project
          system("npx yalc add mailing")

          # open the subprocess
          @io = IO.popen("npx mailing --quiet --typescript --emails-dir=\"./emails\"")
          # TODO: wait for the preview server to start
        end

        run_cypress_tests
      ensure
        cleanup_io_and_subprocess
        cleanup_runs_directory
      end
    end
  end

  def run_cypress_tests
    Dir.chdir(CYPRESS_DIR) do
      system("yarn cypress run")
    end
  end

  def cleanup_io_and_subprocess
    return unless @io

    # kill the subprocess
    Process.kill "INT", @io.pid

    # close the io
    @io.close
    @io = nil
  end

  def cleanup_runs_directory
    Dir.glob("#{RUNS_DIR}/*")[NUM_RUNS_TO_KEEP..-1]&.sort{|a,b| b <=> a}&.each do |dir|
      puts "Cleaning up #{dir}"
      FileUtils.rm_rf(dir)
    end
  end
end

TestRunner.new.run
