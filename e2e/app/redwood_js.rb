# frozen_string_literal: true

require_relative 'base'

module App
  class RedwoodJs < Base
    def initialize(root_dir, *args)
      super('redwood_js', root_dir, *args)
    end

    private

    def yarn_create!
      Dir.chdir(@root_dir) do
        system_quiet('yarn create redwood-app .')

        # yarn add peer dependencies
        system_quiet('yarn add next react react-dom')
      end
    end
  end
end
