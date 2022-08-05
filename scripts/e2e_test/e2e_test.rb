# frozen_string_literal: true

require 'tmpdir'

class TestRunner
  BASE_DIR = "./runs"
  NUM_RUNS_TO_KEEP = 5

  E2E_CONFIG = [
    {name: 'next_ts',
      commands: [
        "yarn create next-app . --typescript",
        "yalc add mailing",
      ]},
    # {name: 'next_js'},
  ];

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
            f = IO.popen("npx mailing --typescript --emails-dir=\"./emails\"")

            # run cypress tests
            # implement me

            # kill the subprocess
            Process.kill "INT", f.pid

            # close the io
            f.close
          end
        ensure
          cleanup_runs_directory
        end
      end
    end

    def cleanup_runs_directory
      Dir.glob("#{BASE_DIR}/*")[NUM_RUNS_TO_KEEP..-1]&.sort{|a,b| b <=> a}&.each do |dir|
        puts "Cleaning up #{dir}"
        FileUtils.rm_rf(dir)
      end
    end
  end

  TestRunner.new.run
