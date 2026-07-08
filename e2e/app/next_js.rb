# frozen_string_literal: true

require_relative 'base'

module App
  class NextJs < Base
    def initialize(root_dir, *args)
      super('next_js', root_dir, *args)
    end

    private

    def yarn_create!
      Dir.chdir(root_dir) do
        # Pinned to create-next-app@14 for reproducibility and to stay within
        # mailing's supported next range (^12 || ^13 || ^14). `yarn create pkg@ver`
        # is broken in yarn 1.x (it execs a binary literally named "pkg@ver"), so
        # we pin via npx. `--no-experimental-app` was removed after next 13.4 —
        # `--no-app` (Pages Router) replaces it, and `--no-tailwind` is now required
        # to keep the scaffold non-interactive. See gh#504.
        cmd = <<-STR.split("\n").map(&:strip).join(' ')
          npx --yes create-next-app@14 .
          --javascript
          --no-eslint --no-tailwind --no-src-dir --no-app --import-alias='@/*' --use-yarn
        STR
        system_quiet(cmd)
      end
    end
  end
end
