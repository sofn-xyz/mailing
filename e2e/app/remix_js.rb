# frozen_string_literal: true

require_relative 'base'

module App
  class RemixJs < Base
    def initialize(root_dir, *args)
      super('remix_js', root_dir, *args)
    end

    private

    def yarn_create!
      Dir.chdir(root_dir) do
        # create-remix >= 2.17 refuses to scaffold and forwards to
        # create-react-router (Remix v2 is now maintenance-only inside React
        # Router). We pin 2.16.8 (last version that still scaffolds classic
        # Remix v2) via npx, and pin the template to the remix@2.16.8 tag because
        # the `templates/` dir was removed from the repo's default branch. The
        # `--typescript`/`--no-typescript` flags were removed in Remix v2 — JS uses
        # the `remix-javascript` template instead. See gh#504.
        system_quiet(
          'npx --yes create-remix@2.16.8 . ' \
          '--template=https://github.com/remix-run/remix/tree/remix@2.16.8/templates/remix-javascript ' \
          '--no-git-init --yes --no-install'
        )

        # yarn add peer dependencies (pinned to mailing's supported range)
        system_quiet('yarn add next@^14 react@^18 react-dom@^18')
      end
    end
  end
end
