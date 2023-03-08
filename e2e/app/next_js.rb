# frozen_string_literal: true

require_relative 'base'

module App
  class NextJs < Base
    def initialize(root_dir, *args)
      super('next_js', root_dir, *args)
    end

    private

    def yarn_create!
      Dir.chdir(root_dir) do
        cmd = <<-STR.split("\n").map(&:strip).join(' ')
          yarn create next-app .
          --javascript
          --no-eslint --no-src-dir --no-experimental-app --import-alias='@/*'
        STR
        system_quiet(cmd)
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
