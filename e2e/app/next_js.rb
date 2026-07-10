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
        # Unpinned on purpose: these tests exist to catch breakage against the
        # latest create-next-app. `--no-experimental-app` was removed after next
        # 13.4 (`--no-app` = Pages Router replaces it); `--no-tailwind` and
        # `--yes` keep the current CLI non-interactive.
        cmd = <<-STR.split("\n").map(&:strip).join(' ')
          yarn create next-app .
          --javascript
          --no-eslint --no-tailwind --no-src-dir --no-app --import-alias='@/*' --use-yarn --yes
        STR
        system_quiet(cmd)
      end
    end
  end
end
