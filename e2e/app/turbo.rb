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
  end
end
