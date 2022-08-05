# frozen_string_literal: true

require 'tmpdir'
require 'json'

class TestRunner
  NUM_RUNS_TO_KEEP = 12
  PROJECT_ROOT = File.expand_path(__dir__ + '/../..') 
  RUNS_DIR = File.expand_path(__dir__ + '/runs')
  CYPRESS_DIR = File.join(PROJECT_ROOT, 'packages/cli/cypress')

  E2E_CONFIG = [
    {
      name: 'next_ts',
      command: "yarn create next-app . --typescript",
    },
    {
      name: 'next_js',
      command: "yarn create next-app ."
    }
  ];

  def initialize
    fail "Check that PROJECT_ROOT exists: #{PROJECT_ROOT}" unless Dir.exists?(PROJECT_ROOT)
    
    package_json_file = File.join(PROJECT_ROOT, 'package.json')
    fail "Check that PROJECT_ROOT is the project root: #{PROJECT_ROOT}" unless File.exists?(package_json_file) && 'mailing-monorepo' == JSON::parse(File.read(package_json_file))['name']
    fail "Check that CYPRESS_DIR exists: #{CYPRESS_DIR}" unless Dir.exists?(CYPRESS_DIR)
  end

  def run
    Dir.chdir(PROJECT_ROOT) do
      system("yalc add")
      system("yarn build")
      system("yalc push")
    end

    E2E_CONFIG.each do |config|
      begin
        tmp_dir_name = BASE_DIR + "/" + [config[:name], Time.now.strftime("%Y%m%d%H%M%S")].join('-')

        puts "⚙️  " * 10
        puts "Attempting #{config[:name]} in #{tmp_dir_name}"
        puts "⚙️  " * 10

        Dir.mkdir(tmp_dir_name)

        Dir.chdir(tmp_dir_name) do
          # run the bootstrap command
          system(config[:command])

          ## add mailing to the project
          system("yalc add mailing")

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
