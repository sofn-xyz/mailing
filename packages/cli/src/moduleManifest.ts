import { ComponentMail } from "mailing-core";

let sendMail = (_mail: ComponentMail) => {};
let previews: { [key: string]: any } = {};
let templates: { [key: string]: any } = {};
let config: { [key: string]: any } = {};

if (process.env.MAILING_INTEGRATION_TEST) {
  /* eslint-disable-next-line @typescript-eslint/no-var-requires */
  const moduleManifestMock = require("./__mocks__/moduleManifest");
  sendMail = moduleManifestMock.sendMail;
  previews = moduleManifestMock.previews;
  templates = moduleManifestMock.templates;
  config = moduleManifestMock.config;
}


const moduleManifest = { sendMail, config, templates, previews };
export { sendMail, config, templates, previews };
export default moduleManifest;
