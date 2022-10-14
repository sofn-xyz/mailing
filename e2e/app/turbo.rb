# frozen_string_literal: true

require_relative 'base'

module App
  class Turbo < Base
    attr_writer :sub_dir

    def initialize(root_dir, *args)
      @sub_dir = 'apps/web'
      super('turbo', root_dir, *args)
    end

    private

    def yarn_create!
      Dir.chdir(@root_dir) do
        system_quiet('npx create-turbo@latest --use-yarn .')
      end
    end

    def yarn_add_test_dependencies!
      puts "yarn add'ing dependencies required for  tests"
      Dir.chdir(@root_dir) do
        system_quiet('yarn add -W --dev @babel/preset-env jest cypress')
      end
    end
  end
end
