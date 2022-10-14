# frozen_string_literal: true

class Config
  NUM_RUNS_TO_KEEP = 5
  E2E_ROOT = File.expand_path(__dir__)
  CACHE_DIR = File.join(E2E_ROOT, 'cache')
  PROJECT_ROOT = File.expand_path("#{__dir__}/..")
  CLI_ROOT = File.join(PROJECT_ROOT, 'packages/cli')
  CORE_ROOT = File.join(PROJECT_ROOT, 'packages/core')
  CYPRESS_DIR = File.join(PROJECT_ROOT, 'packages/cli/cypress')
  JEST_TESTS_DIR = File.join(PROJECT_ROOT, 'e2e/lib/jest_tests')
  TEST_ROOT = File.expand_path('/tmp/mailing_e2e')
  RUNS_DIR = File.expand_path("#{TEST_ROOT}/runs")
end
