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

    def add_yarn_ci_scripts!
      super

      Dir.chdir(root_dir) do
        package_json = JSON.parse(File.read('package.json'))
        package_json['resolutions'] ||= {}
        package_json['resolutions']['@types/react'] = '^17'
        package_json['resolutions']['@types/react-dom'] = '^17'
        File.write('package.json', JSON.pretty_generate(package_json))
      end
    end
  end
end
