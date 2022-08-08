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
      command: "yarn create next-app . --typescript",
    },
    {
      name: 'next_js',
      command: "yarn create next-app ."
    },
    {
      name: 'redwood_ts',
      command: "yarn create redwood-app . --typescript > /dev/null; touch yarn.lock; yarn",
    },
    {
      name: 'redwood_js',
      command: "yarn create redwood-app . > /dev/null; touch yarn.lock; yarn"
    },
  ];

  def assign_opts!
    @opts = {}
    ARGV.each do |str|
      k, v = str.split('=')
      k.delete_prefix!('--')
      v = true if v.nil?
      @opts[k] = v
    end
  end

  def opt?(key)
    @opts[key]
  end

  def initialize
    assign_opts!

    fail "Check that PROJECT_ROOT exists: #{PROJECT_ROOT}" unless Dir.exists?(PROJECT_ROOT)

    package_json_file = File.join(PROJECT_ROOT, 'package.json')
    fail "Check that PROJECT_ROOT is the project root: #{PROJECT_ROOT}" unless File.exists?(package_json_file) && 'mailing-monorepo' == JSON::parse(File.read(package_json_file))['name']
    fail "Check that CYPRESS_DIR exists: #{CYPRESS_DIR}" unless Dir.exists?(CYPRESS_DIR)
  end

  def system_quiet(cmd)
    system("#{cmd} > /dev/null")
  end

  def build_mailing
    announce "Building mailing...", "🔨"

    Dir.chdir(PROJECT_ROOT) do
      system_quiet("npx yalc remove")
      system_quiet("npx yalc add")
      system_quiet("yarn build")
      system_quiet("npx yalc push")
    end
  end

  def announce(text, emoji)
    puts "\n" * 10
    puts "#{emoji}  " * 10 + "\n" + text + "\n" + "#{emoji}  " * 10
  end

  def run
    @timestamp_dir = Time.now.strftime("%Y%m%d%H%M%S")

    build_mailing unless opt?('skip-build')

    # create runs_dir
    runs_dir_name = File.join(RUNS_DIR, @timestamp_dir)
    FileUtils.mkdir_p(runs_dir_name)

    # create latest symlink
    latest_dir = File.join(RUNS_DIR, 'latest')
    system("rm #{latest_dir}; ln -s #{runs_dir_name} #{latest_dir}")
      
     # TODO: add a `framework=` option to specify an individual framework to run
    E2E_CONFIG.each do |config|
      @config = config
      
      begin
        tmp_dir_name = File.join(runs_dir_name, config[:name])

        announce "Creating next #{config[:name]} app in #{tmp_dir_name}", "⚙️"

        FileUtils.mkdir_p(tmp_dir_name)

        Dir.chdir(tmp_dir_name) do
          # run the bootstrap command
          system_quiet(config[:command])

          ## add mailing to the project
          system("npx yalc add mailing")

          # open the subprocess
          @io = IO.popen("npx mailing --quiet --typescript --emails-dir=\"./emails\"")
          # TODO: wait for the preview server to start
        end

        run_cypress_tests
      ensure
        cleanup_io_and_subprocess
      end
    end

    cleanup_runs_directory
  end

  def run_cypress_tests
    announce "Running cypress tests for #{@config[:name]}", "🏃"
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
    dirs_to_cleanup = Array(Dir.glob("#{RUNS_DIR}/*")).sort{|a,b| b <=> a}.delete_if{|f| f =~ /latest/}[NUM_RUNS_TO_KEEP..-1]
    dirs_to_cleanup.each do |dir|
      puts "Cleaning up #{dir}"
      FileUtils.rm_rf(dir)
    end
  end
end

TestRunner.new.run
