# frozen_string_literal: true

class Config
  E2E_ROOT = File.expand_path(__dir__)
  CACHE_DIR = File.join(E2E_ROOT, 'cache')
  MAILING_TESTS_DIR = File.join(E2E_ROOT, 'mailing_tests')

  PROJECT_ROOT = File.expand_path("#{__dir__}/..")
  CLI_ROOT = File.join(PROJECT_ROOT, 'packages/cli')
  CORE_ROOT = File.join(PROJECT_ROOT, 'packages/core')

  TEST_ROOT = File.expand_path('/tmp/mailing_e2e')
  RUNS_DIR = File.expand_path("#{TEST_ROOT}/runs")
end
