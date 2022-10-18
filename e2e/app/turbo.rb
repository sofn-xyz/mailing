# frozen_string_literal: true

require_relative 'base'

module App
  class Turbo < Base
    attr_writer :sub_dir

    def initialize(root_dir, *args)
      super('turbo', root_dir, *args)
    end

    def install_dir
      File.join(root_dir, 'apps/web')
    end

    private

    def yarn_create!
      Dir.chdir(root_dir) do
        system_quiet('npx create-turbo@latest --use-yarn .')
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
