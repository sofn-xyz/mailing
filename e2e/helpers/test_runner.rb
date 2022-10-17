# frozen_string_literal: true

require 'English'
require 'tmpdir'
require 'json'
require 'socket'

require_relative 'helpers/test_runner_utils'
require_relative 'helpers/opts_parser'
require_relative 'app/next_ts'
require_relative 'app/next_js'
require_relative 'app/redwood_ts'
require_relative 'app/redwood_js'
require_relative 'app/remix_ts'
require_relative 'app/remix_js'
require_relative 'app/standalone'
require_relative 'app/turbo'

class TestRunner
  include TestRunnerUtils
  include OptsParser

  attr_reader :configs, :current_dir

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
end
