require_relative '../helpers/test_runner_utils'

class RedwoodTsApp < App
  include TestRunnerUtils

  def initialize(root_dir)
    super('redwood_ts', root_dir)
  end

private
  def yarn_create!
    Dir.chdir(@root_dir) do
      # ignore stderr and stdout output because this command is expected to fail
      system_quiet("yarn create redwood-app . --typescript")
      
      system("touch yarn.lock")
      system_quiet("yarn")
    end
  end
end