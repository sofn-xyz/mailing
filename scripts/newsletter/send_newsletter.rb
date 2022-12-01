# frozen_string_literal: true

require 'uri'
require 'json'
require 'net/http'

template_name = 'Newsletter'
subject = 'Introducing Mailing 0.9 ⚡'

# emails = File.read("list.csv").split("\n").reject{|x| x.nil? || x == ''}
emails = %w[alex.farrill@gmail.com]

confirm = 'Are you sure you want to send %s with subject "%s" to %s recipients? (y/n)'
puts format(confirm, template_name, subject, emails.size)

unless gets.chomp == 'y'
  puts 'aborting without sending...'
  return
end

api_key = ENV.fetch('MAILING_WEB_EMAILS_PRODUCTION_API_KEY')

raise 'refusing to send without an api key - MAILING_WEB_EMAILS_PRODUCTION_API_KEY is not set' unless api_key

# prepare url
url = URI('https://emails.mailing.run/api/sendMail')
headers = {
  'Content-Type' => 'application/json',
  'X-API-KEY' => api_key
}

# send emails
emails.each do |email|
  request = Net::HTTP::Post.new(url, headers)
  request.body = { templateName: template_name, subject: subject, to: email }.to_json

  response = Net::HTTP.start(url.hostname, url.port, use_ssl: true) do |http|
    http.request(request)
  end

  puts response.inspect
  puts response.body.inspect
  puts "\n\n"

  sleep 0.1
end
