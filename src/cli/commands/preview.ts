import React from "react";
import http from "http";
import { resolve } from "path";
import { render } from "mjml-react";
import open from "open";
import { watch } from "fs-extra";
import { getExistingEmailsDir, getPreviewsDirectory } from "../paths";
import PreviewIndex from "../PreviewIndex";
import { execSync, spawn } from "child_process";
import { exit } from "process";

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
  console.log("Starting preview server 🤠");

  if (process.env.MAILING_DEV && JSON.parse(process.env.MAILING_DEV)) {
    console.log("Rebuilding before preview...");
    execSync("npm run build && MAILING_DEV=false mailing preview", {
      stdio: "inherit",
    });
    exit(0);
  }
  if (process.env.NODE_ENV === "test") {
    return; // for now
  }

  const port = argv?.port || DEFAULT_PORT;

  const previewsPath = getPreviewsDirectory();
  if (!previewsPath) {
    console.log(
      "Could not find emails directory. Have you initialized the project with `mailing init`?"
    );
    return;
  }

  http
    .createServer(function (req, res) {
      if (!req.url) {
        res.end(404);
        return;
      }

      let component;
      try {
        component =
          req.url !== "/"
            ? require(resolve(previewsPath, req.url))
            : React.createElement(PreviewIndex);
      } catch (e) {
        console.log("caught error", e);
        res.writeHead(500);
        res.end(JSON.stringify(e));
        return;
      }

      try {
        const { html, errors } = render(component, {
          minify: false,
        });

        res.writeHead(200);
        res.end(html);
        shouldRefresh = false;
      } catch (e) {
        res.writeHead(500);
        res.end(JSON.stringify(e));
      }
    })
    .listen(port);
  await open(`http://localhost:${port}`);

  console.log(`Running preview server at http://localhost:${port}`);

  const changeWatchPath = getExistingEmailsDir();

  // This is a cool and hacky live reload implementation.
  watch(
    changeWatchPath,
    {
      recursive: true,
    },
    (eventType, filename) => {
      console.log(`Detected ${eventType} on ${filename}, reloading`);
      open(`http://localhost:${port}`, { background: true });
    }
  );
  console.log(`Watching for changes to ${changeWatchPath}`);
};
