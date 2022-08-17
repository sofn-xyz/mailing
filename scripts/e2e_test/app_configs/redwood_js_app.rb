require_relative '../helpers/test_runner_utils'

class RedwoodJsApp < App
  include TestRunnerUtils

  def initialize(root_dir, *args)
    super('redwood_js', root_dir, *args)
  end

private
  def yarn_create!
    Dir.chdir(@root_dir) do
      system_quiet("yarn create redwood-app .")
    end
  end
end