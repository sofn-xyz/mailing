# frozen_string_literal: true

require 'English'
require 'tmpdir'
require 'json'
require 'socket'

require_relative 'helpers/test_runner_utils'
require_relative 'app_configs/app'
require_relative 'app_configs/next_ts_app'
require_relative 'app_configs/next_js_app'
require_relative 'app_configs/redwood_ts_app'
require_relative 'app_configs/redwood_js_app'
require_relative 'app_configs/remix_ts_app'
require_relative 'app_configs/remix_js_app'
require_relative 'app_configs/standalone_app'
require_relative 'app_configs/turbo_app'

class TestRunner
  include TestRunnerUtils

  NUM_RUNS_TO_KEEP = 5
  PROJECT_ROOT = File.expand_path("#{__dir__}/../..")
  TEST_ROOT = File.expand_path("#{PROJECT_ROOT}/tmp/e2e_test")
  CLI_ROOT = File.join(PROJECT_ROOT, 'packages/cli')
  CORE_ROOT = File.join(PROJECT_ROOT, 'packages/core')
  CYPRESS_DIR = File.join(PROJECT_ROOT, 'packages/cli/cypress')
  JEST_TESTS_DIR = File.join(PROJECT_ROOT, 'scripts/e2e_test/jest_tests')
  RUNS_DIR = File.expand_path("#{TEST_ROOT}/runs")

  E2E_CONFIG = {
    standalone: StandaloneApp,
    turbo: TurboApp,
    next_ts: NextTsApp,
    next_js: NextJsApp,
    redwood_ts: RedwoodTsApp,
    redwood_js: RedwoodJsApp,
    remix_ts: RemixTsApp,
    remix_js: RemixJsApp
  }.freeze

  def initialize
    verify_mailing_port_is_free!

    assign_opts!

    raise "Check that PROJECT_ROOT exists: #{PROJECT_ROOT}" unless Dir.exist?(PROJECT_ROOT)

    FileUtils.mkdir_p File.join(TEST_ROOT, 'runs')
    FileUtils.mkdir_p File.join(TEST_ROOT, 'cache')
    FileUtils.cp File.join(PROJECT_ROOT, '.tool-versions'), File.join(TEST_ROOT, '.tool-versions')

    unless File.symlink?(File.join("#{__dir__}/runs"))
      FileUtils.rm_rf File.join("#{__dir__}/runs")
      FileUtils.ln_s File.join(TEST_ROOT, 'runs'), File.join("#{__dir__}/runs")
    end

    unless File.symlink?(File.join("#{__dir__}/cache"))
      FileUtils.rm_rf File.join("#{__dir__}/cache")
      FileUtils.ln_s File.join(TEST_ROOT, 'cache'), File.join("#{__dir__}/cache")
    end

    package_json_file = File.join(PROJECT_ROOT, 'package.json')
    unless File.exist?(package_json_file) && JSON.parse(File.read(package_json_file))['name'] == 'mailing-monorepo'
      raise "Check that PROJECT_ROOT is the project root: #{PROJECT_ROOT}"
    end
    raise "Check that CYPRESS_DIR exists: #{CYPRESS_DIR}" unless Dir.exist?(CYPRESS_DIR)
  end

  def run
    if opt?('rerun')
      runs_dir_name = File.join(RUNS_DIR, 'latest')
    else
      @timestamp_dir = Time.now.strftime('%Y%m%d%H%M%S')

      # create runs_dir
      runs_dir_name = File.join(RUNS_DIR, @timestamp_dir)
      FileUtils.mkdir_p(runs_dir_name)

      # create latest symlink
      latest_dir = File.join(RUNS_DIR, 'latest')
      FileUtils.rm(latest_dir) if File.symlink?(latest_dir)
      FileUtils.ln_s(runs_dir_name, latest_dir)
    end

    build_mailing unless opt?('skip-build')

    configs_to_run.each do |config_name, klass|
      @config_name = config_name

      begin
        tmp_dir_name = File.join(runs_dir_name, config_name.to_s)

        app = klass.new(tmp_dir_name, save_cache: opt?('save-cache'))
        @root_dir = app.root_dir
        app.setup! unless opt?('rerun')

        app.run_mailing!
        @io = app.io

        run_jest_tests
        # run_cypress_tests
      ensure
        cleanup_io_and_subprocess
      end
    end

    cleanup_runs_directory!
  end

  private

  def verify_mailing_port_is_free!
    if TCPSocket.new('localhost', 3883)
      raise 'aborting without running tests... port 3883 is busy, is mailing already running?'
    end
  rescue Errno::ECONNREFUSED
    # the port is open. this is the expected case
  end

  ## Mailing and projects
  #
  def build_mailing
    announce! 'Building mailing...', '🔨'

    Dir.chdir(PROJECT_ROOT) do
      system_quiet('yarn build')
      raise 'yarn build failed' unless $CHILD_STATUS.success?
    end

    Dir.chdir(CLI_ROOT) do
      system_quiet('npx yalc add')
      system_quiet('npx yalc publish')
    end

    Dir.chdir(CORE_ROOT) do
      system_quiet('npx yalc add')
      system_quiet('npx yalc publish')
    end
  end

  def configs_to_run
    if (config_name = opt('only'))
      E2E_CONFIG.select { |k, _v| k.to_s == config_name }
    else
      E2E_CONFIG
    end
  end

  def run_cypress_tests
    announce! "Running cypress tests for #{@config_name}", '🏃'
    Dir.chdir(CYPRESS_DIR) do
      system('yarn cypress run')
    end
  end

  def run_jest_tests
    announce! "Running jest tests for #{@config_name}", '🃏'
    Dir.chdir(@root_dir) do
      # copy jest_tests directory and jest.config.js
      FileUtils.cp_r(JEST_TESTS_DIR, './jest_tests')

      # run yarn jest --rootDir=jest_tests
      system('yarn jest --rootDir=jest_tests -c jest_tests/jest.config.js --forceExit')
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
    raise 'No subprocess found to cleanup' unless @io

    # kill the subprocess
    Process.kill 'INT', @io.pid

    # close the io
    @io.close
    @io = nil
  end

  def cleanup_runs_directory!
    dirs_to_cleanup = Array(Dir.glob("#{RUNS_DIR}/*")).sort do |a, b|
                        b <=> a
                      end.grep_v(/latest/)[NUM_RUNS_TO_KEEP..]
    dirs_to_cleanup&.each do |dir|
      puts "Cleaning up #{dir}"
      spawn("rm -rf #{dir}")
    end
  end
end

TestRunner.new.run
