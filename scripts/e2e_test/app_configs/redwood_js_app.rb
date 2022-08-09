require_relative '../helpers/test_runner_utils'

class RedwoodJsApp < App
  include TestRunnerUtils

  def initialize(root_dir)
    super('redwood_js', root_dir)
  end

private
  def yarn_create!
    Dir.chdir(@root_dir) do
      # ignore stderr and stdout output because this command is expected to fail
      system("yarn create redwood-app . 2>&1 > /dev/null")
      
      system("touch yarn.lock")
      system_quiet("yarn")
    end
  end
end