# frozen_string_literal: true

require_relative '../helpers/system_utils'
require_relative './setup'

module Commands
  class Run
    include SystemUtils

    # @param [String] app_name
    def self.perform(app_name:, opts: {})
      new(app_name: app_name, opts: opts)
    end

    # @param [String] app_name
    def initialize(app_name:, opts: {})
      verify_mailing_port_is_free!
      config = Commands::Setup.perform(app_name: app_name, opts: opts)
      app = config.app

      # Run Jest Tests
      Dir.chdir(app.install_dir) do
        announce! "Running jest tests for #{app_name}", '🃏'
        system('yarn jest --rootDir=mailing_tests/jest --config mailing_tests/jest/jest.config.json')
      end

      app.run_mailing do
        # Run Cypress Tests
        announce! "Running cypress tests for #{app_name}", '🏃'
        system('yarn cypress run --project mailing_tests')
      end
    end
  end
end
