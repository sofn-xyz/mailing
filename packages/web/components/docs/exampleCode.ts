const exampleCode = {};

exampleCode["api/sendMail"] = {
  js: `fetch("/api/sendMail", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-API-KEY": "your-api-key"
  },
  body: JSON.stringify({
    "to": "to@example.com",
    "from": "you@example.com",
    "subject": "Hello world",
    "templateName": "myTemplate",
    "props": {
      "name": "Alex"
    }
  }),
});`,
  http: `POST /api/sendMail
Content-Type: application/json 
X-API-KEY: your-api-key

{
  "to": "to@example.com",
  "from": "you@example.com",
  "subject": "Hello world",
  "templateName": "myTemplate",
  "props": {
    "name": "Alex"
  }
}`,
  ruby: `require 'uri'
require 'json'
require 'net/http'

uri = URI('https://example.com/api/sendMail')
    
request = Net::HTTP::Post.new(uri, {
  'Content-Type' => 'application/json',
  'X-API-KEY' => api_key
})

request.body = { 
  templateName: "myTemplate", 
  subject: "Hello world", 
  to: "to@example.com" 
}.to_json

response = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) do |http|
  http.request(request)
end`,
};

export default exampleCode;
