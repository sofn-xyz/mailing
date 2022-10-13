# frozen_string_literal: true

require_relative 'test_runner'
require_relative 'helpers/test_runner_utils'

class Run
  extend TestRunnerUtils

  def self.run
    runner = TestRunner.new

    runner.setup!

    runner.configs.each do |config_name, _klass|
      begin
        app = runner.build_app(config_name)
        app.run_mailing!
        @io = app.io

        # Run Cypress Tests
        announce! "Running cypress tests for #{config_name}", '🏃'
        Dir.chdir(TestRunner::CYPRESS_DIR) do
          system('yarn cypress run')
        end

        # Run Jest Tests
        announce! "Running jest tests for #{config_name}", '🃏'
        Dir.chdir(app.root_dir) do
          # copy jest_tests directory and jest.config.js
          FileUtils.cp_r(TestRunner::JEST_TESTS_DIR, './jest_tests')

          # run yarn jest --rootDir=jest_tests
          system('yarn jest --rootDir=jest_tests -c jest_tests/jest.config.js --forceExit')
        end
      ensure
        # Cleanup IO And Subprocesses
        raise 'No subprocess found to cleanup' unless @io

        # kill the subprocess
        Process.kill 'INT', @io.pid

        # close the io
        @io.close
        @io = nil
      end

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
end

Run.run
