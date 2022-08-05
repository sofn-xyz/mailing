# frozen_string_literal: true

require 'tmpdir'

class TestRunner
  BASE_DIR = "./runs"
  NUM_RUNS_TO_KEEP = 5
  CYPRESS_DIR = File.expand_path(__dir__ + '/../../packages/cli/cypress')

  E2E_CONFIG = [
    {name: 'next_ts',
      commands: [
        "yarn create next-app . --typescript",
        "yalc add mailing",
      ]},
    # {name: 'next_js'},
  ];

  def initialize
    fail "Check that CYPRESS_DIR exists: #{CYPRESS_DIR}" unless Dir.exists?(CYPRESS_DIR)
  end

  def run
    Dir.chdir("../..") do
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
          config[:commands].each do |cmd|
            puts "running #{cmd}"
            system(cmd)
          end

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
    Dir.glob("#{BASE_DIR}/*")[NUM_RUNS_TO_KEEP..-1]&.sort{|a,b| b <=> a}&.each do |dir|
      puts "Cleaning up #{dir}"
      FileUtils.rm_rf(dir)
    end
  end
end

TestRunner.new.run
