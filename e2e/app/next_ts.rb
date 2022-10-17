# frozen_string_literal: true

require_relative 'base'

module App
  class NextTs < Base
    def initialize(root_dir, *args)
      super('next_ts', root_dir, *args)
    end

    private

    def yarn_create!
      Dir.chdir(root_dir) do
        system_quiet('yarn create next-app . --typescript')
      end
    end
  end
end
