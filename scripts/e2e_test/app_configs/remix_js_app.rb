require_relative '../helpers/test_runner_utils'

class RemixJsApp < App
  include TestRunnerUtils

  def initialize(root_dir, *args)
    super('remix_js', root_dir, *args)
  end

private
  def yarn_create!
    Dir.chdir(@root_dir) do
      system_quiet("yarn create remix . --template=remix --no-typescript --install")
    end
  end
end