# frozen_string_literal: true

require_relative 'base'

module App
  class StandaloneJs < Base
    def initialize(root_dir, *args)
      super('standalone_js', root_dir, *args)
    end

    private

    def yarn_create!
      Dir.chdir(root_dir) do
        system_quiet('yarn init --yes')

        # yarn add peer dependencies (pinned to mailing's supported range so we
        # don't pull next@16, which requires node >= 20.9; see gh#504)
        system_quiet('yarn add next@^14 react@^18 react-dom@^18')
      end
    end
  end
end
