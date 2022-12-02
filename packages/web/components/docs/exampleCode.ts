const exampleCode = {
  "api/sendMail": {
    js: `POST /api/sendMail
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
}
`,
  },
};

export default exampleCode;
