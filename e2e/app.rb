# frozen_string_literal: true

require_relative 'app/standalone'
require_relative 'app/turbo'
require_relative 'app/next_ts'
require_relative 'app/next_js'
require_relative 'app/redwood_ts'
require_relative 'app/redwood_js'
require_relative 'app/remix_ts'
require_relative 'app/remix_js'

module App
  CONFIGS = {
    standalone: App::Standalone,
    turbo: App::Turbo,
    next_ts: App::NextTs,
    next_js: App::NextJs,
    redwood_ts: App::RedwoodTs,
    redwood_js: App::RedwoodJs,
    remix_ts: App::RemixTs,
    remix_js: App::RemixJs
  }.freeze

  def self.from_name(app_name)
    CONFIGS[app_name.to_sym]
  end
end
