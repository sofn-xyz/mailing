import React from "react";
import http from "http";
import { resolve } from "path";
import open from "open";
import { watch } from "fs-extra";
import { getPreviewsDirectory } from "../paths";
import PreviewIndex from "../PreviewIndex";
import log from "../log";

const DEFAULT_PORT = 3883;

exports.command = "preview";

exports.describe = "start the email preview server";

exports.builder = {
  port: {
    default: DEFAULT_PORT,
  },
};

type ArgV = { port: number; build: boolean };

exports.handler = async (argv?: ArgV) => {
  if (process.env.NODE_ENV === "test") {
    return; // for now
  }

  const { render } =  require("mjml-react");

  log("Starting preview server 🤠");

  require("ts-node").register();

  const port = argv?.port || DEFAULT_PORT;

  const previewsPath = getPreviewsDirectory();
  if (!previewsPath) {
    log(
      "Could not find emails directory. Have you initialized the project with `mailing init`?"
    );
    return;
  }

  const host = `http://localhost:${port}`;
  let currentUrl = `${host}/`;

  http
    .createServer(function (req, res) {
      if (!req.url) {
        res.end(404);
        return;
      }

      currentUrl = `${host}${req.url}`;

      let component;
      try {
        if (req.url === "/") {
          component = React.createElement(PreviewIndex);
        } else {
          const [_blank, moduleName, functionName] = req.url.split("/");
          const module = require(resolve(previewsPath, moduleName));
          component = module[functionName]();
        }
      } catch (e) {
        console.log("caught error", e);
        res.writeHead(500);
        res.end(JSON.stringify(e));
        return;
      }

      try {
        const { html, errors } = render(component, {
          packages: [],
          minify: false,
        });

        res.writeHead(200);
        res.end(html || JSON.stringify(errors));
      } catch (e) {
        log("caught error rendering mjml to html", e);
        res.writeHead(500);
        res.end(JSON.stringify(e));
      }
    })
    .listen(port);
  await open(currentUrl);

  log(`Running preview at ${currentUrl}`);

  // simple live reload implementation
  const changeWatchPath = resolve(".");
  watch(changeWatchPath, { recursive: true }, (eventType, filename) => {
    console.log(`Detected ${eventType} on ${filename}, reloading`);
    open(currentUrl, { background: true });
  });
  log(`Watching for changes to ${changeWatchPath}`);
};
