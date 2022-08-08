require_relative '../helpers/test_runner_utils'

class NextJsApp < App
  include TestRunnerUtils

  def initialize(root_dir)
    super('next_js', root_dir)
  end

private
  def yarn_create!
    Dir.chdir(@root_dir) do
      system_quiet("yarn create next-app .")
    end
  end
end