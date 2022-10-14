# frozen_string_literal: true

require_relative 'base'

module App
  class RedwoodTs < Base
    def initialize(root_dir, *args)
      super('redwood_ts', root_dir, *args)
    end

    private

    def yarn_create!
      Dir.chdir(root_dir) do
        system_quiet('yarn create redwood-app . --typescript')

        # yarn add peer dependencies
        system_quiet('yarn add next react react-dom')
      end
    end
  end
end
