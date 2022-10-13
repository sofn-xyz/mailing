# frozen_string_literal: true

require_relative 'test_runner'
require_relative 'helpers/system_utils'

class Run
  extend TestRunnerUtils

  def self.run
    runner = TestRunner.new
    runner.setup!

    runner.configs.each do |config_name, _klass|
      app = runner.build_app(config_name)

      app.run_mailing do
        # Run Cypress Tests
        announce! "Running cypress tests for #{config_name}", '🏃'
        Dir.chdir(TestRunner::CYPRESS_DIR) do
          system('yarn cypress run')
        end

      # Run Jest Tests
      announce! "Running jest tests for #{config_name}", '🃏'
      Dir.chdir(app.root_dir) do
        # copy jest tests into app
        FileUtils.cp_r(TestRunner::JEST_TESTS_DIR, './jest_tests')
        # run them
        system('yarn jest --rootDir=jest_tests -c jest_tests/jest.config.js --forceExit')
      end
    end

    cleanup!
  end

  def self.cleanup
    # Cleanup runs directory!
    dirs_to_cleanup = Array(Dir.glob("#{TestRunner::RUNS_DIR}/*"))
    .sort { |a, b| b <=> a }
    .grep_v(/latest/)[TestRunner::NUM_RUNS_TO_KEEP..]

    dirs_to_cleanup&.each do |dir|
      puts "Cleaning up #{dir}"
      spawn("rm -rf #{dir}")
    end
  end
end

Run.run
