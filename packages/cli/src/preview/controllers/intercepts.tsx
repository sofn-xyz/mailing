import { IncomingMessage, ServerResponse } from "http";
import { log } from "../../util/log";
import { renderNotFound } from "./application";
import { sendMail } from "../../moduleManifest";

const cache: {
  [id: string]: Intercept;
} = {
  mock: {
    id: "mock",
    html: "<html><body><h1>Title</h1>hope it's not too strict</body></html>",
    to: "peter s. <peter+mailingtest@campsh.com>",
    cc: "monica+mailingtest@campsh.com",
    from: "peter+sendgrid@campsh.com",
    subject: "A mocked test email",
  },
};

function getData(req: IncomingMessage) {
  const parts = req.url?.split("/");
  const id = parts ? parts[parts.length - 2] : "";
  console.log(":get", id);
  return cache[id];
}

export function createIntercept(req: IncomingMessage, res: ServerResponse) {
  let body = "";
  req.on("data", function onData(data) {
    body += data;
    if (body.length > 1e8) req.destroy();
  });

  req.on("end", function onEnd() {
    const id = Date.now();
    cache[id] = { ...JSON.parse(body), id };
    res.writeHead(201);
    res.end(JSON.stringify({ id }));
    log(`Cached intercept preview at /previews/${id}`);
  });
}

export function showIntercept(req: IncomingMessage, res: ServerResponse) {
  const data = getData(req);

  if (data) {
    res.setHeader("Content-Type", "application/json");
    res.writeHead(200);
    const intercept: Intercept = { ...data };
    res.end(JSON.stringify(intercept));
  } else {
    renderNotFound(res);
  }
}

export async function sendIntercept(req: IncomingMessage, res: ServerResponse) {
  const data = getData(req);

  if (data) {
    // force deliver, we don't want this one intercepted
    await sendMail({ ...data, dangerouslyForceDeliver: true });

    res.setHeader("Content-Type", "application/json");
    res.writeHead(200);
    res.end();
  } else {
    renderNotFound(res);
  }
}
