# frozen_string_literal: true

require_relative '../mailing'

module Commands
  class UpdateSnapshot
    include SystemUtils

    def self.perform(opts: {})
      app_name = opts['app'] || 'next_ts'
      new(app_name: app_name, opts: opts)
    end

    # @param [String] app_name
    def initialize(app_name:, opts: {})
      verify_mailing_port_is_free!
      config = Commands::Setup.perform(app_name: app_name, opts: opts)
      app = config.app

      # Run Jest Tests
      Dir.chdir(app.install_dir) do
        announce! "Running jest tests with --updateSnapshot for #{app_name}", '🃏'
        system('yarn jest --rootDir=mailing_tests/jest --config mailing_tests/jest/jest.config.json --updateSnapshot')

        # copy snapshots back to mailing
        announce! 'Copying updated snapshots to the mailing project', '🥋'
        system(format('find ./mailing_tests -name \'*.snap\' | cpio -p %s', Config::E2E_ROOT))
      end
    end
  end
end
