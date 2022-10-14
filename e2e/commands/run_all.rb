# frozen_string_literal: true

require_relative '../mailing'

module Commands
  class RunAll
    SKIPPED_APPS = %i[redwood_js redwood_ts].freeze

    def self.perform(opts: {})
      Mailing.build

      (App::CONFIGS - SKIPPED_APPS).each_key do |app_name|
        Commands::Run.perform(app_name: app_name, opts: opts.merge('skip-build' => true))
      end
    end
  end
end
