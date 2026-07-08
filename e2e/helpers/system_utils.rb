# frozen_string_literal: true

require 'English'
require 'socket'
require_relative '../config'

## Utility stuff
module SystemUtils
  NUM_RUNS_TO_KEEP = 5

  def system_quiet(cmd)
    success = if ENV['VERBOSE']
                system(cmd)
              else
                system("#{cmd} > /dev/null")
              end

    # Fail loudly. Previously a failed `yarn add` (e.g. an incompatible-engine
    # error) was ignored here and only surfaced as a confusing downstream error
    # many steps later. See gh#504.
    raise "Command failed (exit #{$CHILD_STATUS&.exitstatus.inspect}): #{cmd}" unless success

    success
  end

  def announce!(text, emoji)
    10.times { puts "\n" }
    puts "#{"#{emoji}  " * 10}\n#{text}\n#{"#{emoji}  " * 10}"
  end

  def cleanup!
    # Cleanup runs directory!
    dirs_to_cleanup = Array(Dir.glob("#{Config::RUNS_DIR}/*"))
                      .sort { |a, b| b <=> a }
                      .grep_v(/latest/)[NUM_RUNS_TO_KEEP..]

    dirs_to_cleanup&.each do |dir|
      puts "Cleaning up #{dir}"
      spawn("rm -rf #{dir}")
    end
  end

  def verify_mailing_port_is_free!
    # Verify that mailing is not running

    if TCPSocket.new('localhost', 3883)
      raise 'aborting without running tests... port 3883 is busy, is mailing already running?'
    end
  rescue Errno::ECONNREFUSED
    # the port is open. this is the expected case
  end
end
