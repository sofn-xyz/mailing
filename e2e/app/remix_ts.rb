# frozen_string_literal: true

require_relative 'base'

module App
  class RemixTs < Base
    def initialize(root_dir, *args)
      @typescript = true
      super('remix_ts', root_dir, *args)
    end

    private

    def yarn_create!
      Dir.chdir(root_dir) do
        # See remix_js.rb for why create-remix and the template are pinned to the
        # remix@2.16.8 tag. The TypeScript variant uses the `remix` template
        # (`--typescript` was removed as a flag in Remix v2). See gh#504.
        system_quiet(
          'npx --yes create-remix@2.16.8 . ' \
          '--template=https://github.com/remix-run/remix/tree/remix@2.16.8/templates/remix ' \
          '--no-git-init --yes --no-install'
        )

        # yarn add peer dependencies (pinned to mailing's supported range)
        system_quiet('yarn add next@^14 react@^18 react-dom@^18')
      end
    end
  end
end
