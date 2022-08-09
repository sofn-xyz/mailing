require_relative '../helpers/test_runner_utils'

class NextTsApp < App
  include TestRunnerUtils

  def initialize(root_dir, *args)
    super('next_ts', root_dir, *args)
  end

private
  def yarn_create!
    Dir.chdir(@root_dir) do
      system_quiet("yarn create next-app . --typescript")
    end
  end
end