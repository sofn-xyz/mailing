# frozen_string_literal: true

require 'English'
require 'tmpdir'
require 'json'
require 'socket'

require_relative 'helpers/test_runner_utils'
require_relative 'helpers/opts_parser'
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
  include OptsParser

  attr_reader :configs, :current_dir

  NUM_RUNS_TO_KEEP = 5
  PROJECT_ROOT = File.expand_path("#{__dir__}/..")
  TEST_ROOT = File.expand_path('/tmp/mailing_e2e')
  CLI_ROOT = File.join(PROJECT_ROOT, 'packages/cli')
  CORE_ROOT = File.join(PROJECT_ROOT, 'packages/core')
  CYPRESS_DIR = File.join(PROJECT_ROOT, 'packages/cli/cypress')
  JEST_TESTS_DIR = File.join(PROJECT_ROOT, 'e2e/jest_tests')
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
    assign_opts!
    set_configs!
    verify_mailing_port_is_free!
  end

  def setup!
    setup_environment
    build_mailing
  end

  # @return [App] 
  def build_app(app_name)
    klass = E2E_CONFIG[app_name.to_sym]
    tmp_dir_name = File.join(@current_dir, app_name.to_s)
    app = klass.new(tmp_dir_name, save_cache: opt?('save-cache'))
    app.setup! unless opt?('rerun')
    app
  end

private

  # sets @configs
  def set_configs!
    @configs = if (config_name = opt('only'))
      E2E_CONFIG.select { |k, _v| k.to_s == config_name }
    else
      E2E_CONFIG
    end
  end

  def verify_mailing_port_is_free!
    # Verify that mailing is not running
    begin
      if TCPSocket.new('localhost', 3883)
        raise 'aborting without running tests... port 3883 is busy, is mailing already running?'
      end
    rescue Errno::ECONNREFUSED
      # the port is open. this is the expected case
    end
  end

  # Ensures that necessary directories and symlinks exist
  # sets @runs_dir_name
  def setup_environment
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

    if opt?('rerun')
      @current_dir = File.join(RUNS_DIR, 'latest')
    else
      timestamp_dir = Time.now.strftime('%Y%m%d%H%M%S')

      # create current_dir
      @current_dir = File.join(RUNS_DIR, timestamp_dir)
      FileUtils.mkdir_p(@current_dir)

      # create latest symlink
      latest_dir = File.join(RUNS_DIR, 'latest')
      FileUtils.rm(latest_dir) if File.symlink?(latest_dir)
      FileUtils.ln_s(@current_dir, latest_dir)
    end
  end

  # Install yarn dependencies and publish Cli and Core to yalc
  def build_mailing
    if opt?('skip-build')
      puts 'Skipping build because skip-build flag is set'
      return
    end

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
end
