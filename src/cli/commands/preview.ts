import React from "react";
import http from "http";
import { resolve } from "path";
import { render } from "mjml-react";
import open from "open";
import { getPreviewsDirectory } from "../paths";
import PreviewIndex from "../PreviewIndex";

const DEFAULT_PORT = 3883;

exports.command = "preview";

exports.describe = "start the email preview server";

exports.builder = {
  port: {
    default: DEFAULT_PORT,
  },
};

type ArgV = { port: number };

exports.handler = async (argv?: ArgV) => {
  if (process.env.NODE_ENV === "test") {
    return; // for now
  }

  const port = argv?.port || DEFAULT_PORT;

  const previewsPath = getPreviewsDirectory();
  if (!previewsPath) {
    console.log(
      "Could not find emails directory. Have you initialized the project with `mailings init`?"
    );
    return;
  }

  console.log("Starting preview server...");

  http
    .createServer(function (req, res) {
      let component;
      try {
        component =
          req.url && req.url !== "/"
            ? require(resolve(previewsPath, req.url))
            : React.createElement(PreviewIndex);
      } catch (e) {
        res.writeHead(404);
        res.end(JSON.stringify(e));
        return;
      }

      const { html, errors } = render(component, {
        minify: false,
      });

      res.writeHead(200);
      res.end(html);
    })
    .listen(port);
  open(`http://localhost:${port}`);

  console.log(`running preview server on localhost:${port}`);
};
