# frozen_string_literal: true

require_relative '../lib/mailing'

module Commands
  class RunAll
    def self.perform(opts: {})
      Mailing.build

      App::CONFIGS.each_key do |app_name|
        Commands::Run.perform(app_name: app_name, opts: opts.merge('skip-build' => true))
      end
    end
  end
end
