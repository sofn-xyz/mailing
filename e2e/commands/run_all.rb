# frozen_string_literal: true

require_relative '../mailing'

module Commands
  class RunAll
    def self.supported_frameworks
      App::CONFIGS.keys - App::SKIPPED_APPS
    end

    def self.perform(opts: {})
      Mailing.build

      supported_frameworks.each do |app_name|
        Commands::Run.perform(app_name: app_name, opts: opts.merge('skip-build' => true))
      end
    end
  end
end
