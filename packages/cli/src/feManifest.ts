/*
 * This file is only directlied used in development and tests.
 * In production is it overwritten by the build process.
 */

import { getTemplatePath } from "./templates";

/* eslint-disable-next-line @typescript-eslint/no-var-requires */
const feManifest = require(`./${getTemplatePath()}/feManifest`).default;

const config = feManifest.config;

const manifest = { config };
export { config };
export default manifest;
