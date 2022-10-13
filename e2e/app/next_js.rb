# frozen_string_literal: true


module App
  class NextJs < Base
    def initialize(root_dir, *args)
      super('next_js', root_dir, *args)
    end

    private

    def yarn_create!
      Dir.chdir(@root_dir) do
        system_quiet('yarn create next-app .')
      end
    end
  end
end
