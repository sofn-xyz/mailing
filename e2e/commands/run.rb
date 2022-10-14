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

      app.run_mailing do
        # Run Cypress Tests
        announce! "Running cypress tests for #{app_name}", '🏃'
        Dir.chdir(Config::CYPRESS_DIR) do
          system('yarn cypress run')
        end

        # Run Jest Tests
        announce! "Running jest tests for #{app_name}", '🃏'
        Dir.chdir(app.root_dir) do
          system('yarn jest --rootDir=jest_tests -c jest_tests/jest.config.js')
        end
      end
    end
  end
end
