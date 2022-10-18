# frozen_string_literal: true

require_relative 'base'

module App
  class RemixTs < Base
    def initialize(root_dir, *args)
      super('remix_ts', root_dir, *args)
    end

    private

    def yarn_create!
      Dir.chdir(root_dir) do
        # install with the "remix" template
        system_quiet('yarn create remix . --template=remix --typescript --install')

        ## variation: indie-stack is a different remix template that people use
        # system_quiet("yarn create remix . --template=remix-run/indie-stack --typescript --install")

        # yarn add peer dependencies
        system_quiet('yarn add next react react-dom')
      end
    end
  end
end
