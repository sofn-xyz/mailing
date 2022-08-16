# frozen_string_literal: true

require 'tmpdir'
require 'json'

require_relative 'helpers/test_runner_utils'
require_relative 'app_configs/app'
require_relative 'app_configs/next_ts_app'
require_relative 'app_configs/next_js_app'
require_relative 'app_configs/redwood_ts_app'
require_relative 'app_configs/redwood_js_app'
require_relative 'app_configs/remix_ts_app'
require_relative 'app_configs/remix_js_app'

class TestRunner
  include TestRunnerUtils

  NUM_RUNS_TO_KEEP = 5
  PROJECT_ROOT = File.expand_path(__dir__ + '/../..')
  TEST_ROOT = File.expand_path(PROJECT_ROOT + '/../mailing_e2e_tests')
  CLI_ROOT = File.join(PROJECT_ROOT, 'packages/cli')
  CYPRESS_DIR = File.join(PROJECT_ROOT, 'packages/cli/cypress')
  RUNS_DIR = File.expand_path(TEST_ROOT + '/runs')

  E2E_CONFIG = {
    next_ts: NextTsApp,
    next_js: NextJsApp,
    redwood_ts: RedwoodTsApp,
    redwood_js: RedwoodJsApp,
    remix_ts: RemixTsApp,
    remix_js: RemixJsApp
  }

  def initialize
    assign_opts!

    fail "Check that PROJECT_ROOT exists: #{PROJECT_ROOT}" unless Dir.exists?(PROJECT_ROOT)
    FileUtils.mkdir_p File.join(TEST_ROOT, "runs")
    FileUtils.mkdir_p File.join(TEST_ROOT, "cache")
    FileUtils.cp File.join(PROJECT_ROOT, ".tool-versions"), File.join(TEST_ROOT, ".tool-versions")

    unless File.symlink?(File.join(__dir__ + "/runs"))
      FileUtils.rm_rf File.join(__dir__ + "/runs")
      FileUtils.ln_s File.join(TEST_ROOT, "runs"), File.join(__dir__ + "/runs")
    end
    
    unless File.symlink?(File.join(__dir__ + "/cache"))
      FileUtils.rm_rf File.join(__dir__ + "/cache")
      FileUtils.ln_s File.join(TEST_ROOT, "cache"), File.join(__dir__ + "/cache")
    end

    package_json_file = File.join(PROJECT_ROOT, 'package.json')
    fail "Check that PROJECT_ROOT is the project root: #{PROJECT_ROOT}" unless File.exists?(package_json_file) && 'mailing-monorepo' == JSON::parse(File.read(package_json_file))['name']
    fail "Check that CYPRESS_DIR exists: #{CYPRESS_DIR}" unless Dir.exists?(CYPRESS_DIR)
  end

  def run
    @timestamp_dir = Time.now.strftime("%Y%m%d%H%M%S")

    build_mailing unless opt?('skip-build')

    # create runs_dir
    runs_dir_name = File.join(RUNS_DIR, @timestamp_dir)
    FileUtils.mkdir_p(runs_dir_name)

    # create latest symlink
    latest_dir = File.join(RUNS_DIR, 'latest')
    FileUtils.rm(latest_dir) if File.symlink?(latest_dir)
    FileUtils.ln_s(runs_dir_name, latest_dir)
      
    configs_to_run.each do |config_name, klass|
      @config_name = config_name
      
      begin
        tmp_dir_name = File.join(runs_dir_name, config_name.to_s)

        app = klass.new(tmp_dir_name, save_cache: opt?('save-cache'))
        app.setup!

        @io = app.io

        run_cypress_tests
      ensure
        cleanup_io_and_subprocess
      end
    end

    cleanup_runs_directory!
  end

private

  ## Mailing and projects
  #
  def build_mailing
    announce! "Building mailing...", "🔨"

    Dir.chdir(PROJECT_ROOT) do
      system_quiet("yarn build")
    end

    Dir.chdir(CLI_ROOT) do
      system("npx yalc add")
      system("npx yalc publish")
    end
  end

  def configs_to_run
    if config_name = opt('only')
      E2E_CONFIG.select{|k, v| k.to_s == config_name}
    else
      E2E_CONFIG
    end
  end

  def run_cypress_tests
    announce! "Running cypress tests for #{@config_name}", "🏃"
    Dir.chdir(CYPRESS_DIR) do
      system("yarn cypress run")
    end
  end

  ## Option parsing
  #
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
    !!@opts[key]
  end

  def opt(key)
    @opts[key]
  end

  ## Cleanup
  #

  def cleanup_io_and_subprocess
    fail "No subprocess found to cleanup" unless @io

    # kill the subprocess
    Process.kill "INT", @io.pid

    # close the io
    @io.close
    @io = nil
  end

  def cleanup_runs_directory!
    dirs_to_cleanup = Array(Dir.glob("#{RUNS_DIR}/*")).sort{|a,b| b <=> a}.reject{|f| f =~ /latest/}[NUM_RUNS_TO_KEEP..-1]
    dirs_to_cleanup.each do |dir|
      puts "Cleaning up #{dir}"
      spawn("rm -rf #{dir}")
    end
  end
end

TestRunner.new.run
