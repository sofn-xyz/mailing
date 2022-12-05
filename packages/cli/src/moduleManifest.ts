import { ComponentMail } from "mailing-core";

const sendMail = (_mail: ComponentMail) => {};
const previews: { [key: string]: any } = {};
const templates: { [key: string]: any } = {};
const config: { [key: string]: any } = {};

// if (process.env.NODE_ENV === "test") {
//   /* eslint-disable-next-line @typescript-eslint/no-var-requires */
//   const moduleManifestMock = require("./__mocks__/moduleManifest");
//   sendMail = moduleManifestMock.sendMail;
//   previews = moduleManifestMock.previews;
//   templates = moduleManifestMock.templates;
//   config = moduleManifestMock.config;
// }

// console.log(config, templates, previews);

const moduleManifest = { sendMail, config, templates, previews };
export { sendMail, config, templates, previews };
export default moduleManifest;
