# frozen_string_literal: true

require_relative 'base'

module App
  class NextTs < Base
    def initialize(root_dir, *args)
      @typescript = true
      super('next_ts', root_dir, *args)
    end

    private

    def yarn_create!
      Dir.chdir(root_dir) do
        # See next_js.rb for why this is pinned to create-next-app@14 via npx and
        # why the flags changed (gh#504 toolchain drift).
        cmd = <<-STR.split("\n").map(&:strip).join(' ')
          npx --yes create-next-app@14 .
          --typescript
          --no-eslint --no-tailwind --no-src-dir --no-app --import-alias='@/*' --use-yarn
        STR
        system_quiet(cmd)
      end
    end
  end
end
