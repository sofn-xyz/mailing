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
        cmd = 'yarn create next-app . --typescript'
        cmd += "--no-eslint --no-src-dir --no-experimental-app --import-alias='@/*'"
        system_quiet(cmd)
      end
    end
  end
end
