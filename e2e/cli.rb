# frozen_string_literal: true

require_relative 'helpers/opts_parser'
require_relative 'helpers/system_utils'
require_relative 'commands/run'
require_relative 'commands/setup'
require_relative 'commands/run_all'
require_relative 'commands/update_snapshot'
require_relative 'app'

class Cli
  include OptsParser
  include SystemUtils

  def initialize
    assign_opts!

    if opt?('update-snapshot')
      Commands::UpdateSnapshot.perform(opts: @opts)
    elsif opt?('setup')
      raise 'Missing required option: --app' unless opt?('app')

      Commands::Setup.perform(app_name: opt('app'), opts: @opts)
    elsif opt?('run')
      raise 'Missing required option: --app' unless opt?('app')

      Commands::Run.perform(app_name: opt('app'), opts: @opts)
    elsif opt?('run-all')
      Commands::RunAll.perform(opts: @opts)
    else
      puts "\n"
      puts '  Usage e2e/clib.rb [command] [flags]'
      puts "\n"

      puts '  Commands:'
      puts '    run [flags] - run tests for a given app'
      puts '    setup [flags] - build a given app'
      puts '    run-all [flags] - run tests for all apps'
      puts '    update-snapshot [flags] - update jest snapshots (uses next_ts unless --app is specified)'
      puts "\n"

      puts '  Flags:'
      puts '    --app [app_name] - name of app to run tests for'
      puts '    --save-cache - save each framework install (before mailing is added) to the `cache` directory.
      Subsequent test runs will start with a copy of the cache instead of running `yarn create` and `yarn install`'
      puts '    --help - show this help message'
      puts "\n"
    end

    cleanup!
  end
end

Cli.new
