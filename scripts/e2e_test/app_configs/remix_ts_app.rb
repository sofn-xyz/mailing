require_relative '../helpers/test_runner_utils'

class RemixTsApp < App
  include TestRunnerUtils

  def initialize(root_dir)
    super('remix_ts', root_dir)
  end

private
  def yarn_create!
    Dir.chdir(@root_dir) do
      system_quiet("yarn create remix . --template=remix --typescript --install")
    end
  end
end