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
        # Remix v2 was merged into React Router v7; the classic `create-remix`
        # CLI now refuses to scaffold and forwards here. Unpinned on purpose so
        # these tests catch breakage against the latest React Router starter
        # (a TypeScript + ESM app).
        system_quiet('yarn create react-router . --yes --no-git-init --no-install')

        # yarn add peer dependencies
        system_quiet('yarn add next react react-dom')
      end
    end
  end
end
