# frozen_string_literal: true

## Option parsing
module OptsParser
  def assign_opts!
    @opts = {}
    ARGV.each do |str|
      k, v = str.split('=')
      k.delete_prefix!('--')
      v = true if v.nil?
      @opts[k] = v
    end
  end

  def opt?(key)
    !!@opts[key]
  end

  def opt(key)
    @opts[key]
  end
end
