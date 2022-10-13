# frozen_string_literal: true

## Utility stuff
module SystemUtils
  def system_quiet(cmd)
    system("#{cmd} > /dev/null")
  end

  def announce!(text, emoji)
    puts "\n" * 10
    puts "#{"#{emoji}  " * 10}\n#{text}\n#{"#{emoji}  " * 10}"
  end
end
