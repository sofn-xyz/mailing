export default function registerRequireHooks() {
  if (process.env.MM_DEV) return;
  require("@swc/register");
}
