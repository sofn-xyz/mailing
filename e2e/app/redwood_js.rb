# frozen_string_literal: true

require_relative 'base'

module App
  class RedwoodJs < Base
    def initialize(root_dir, *args)
      super('redwood_js', root_dir, *args)
    end

    private

    def yarn_create!
      Dir.chdir(root_dir) do
        # Pinned via npx for reproducibility (`yarn create pkg@ver` is broken in
        # yarn 1.x). create-redwood-app@8.9.0 requires node >= 20 < 21, which is
        # why the whole matrix targets node 20 (see gh#504).
        system_quiet('npx --yes create-redwood-app@8.9.0 . --ts=false --no-git --yes')

        # yarn add peer dependencies (pinned to mailing's supported range)
        system_quiet('yarn add next@^14 react@^18 react-dom@^18')
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
