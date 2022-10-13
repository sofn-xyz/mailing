# frozen_string_literal: true

require_relative 'test_runner'

runner = TestRunner.new
runner.setup!

runner.configs.each do |config_name, _klass|
  runner.build_app(config_name)
end
  