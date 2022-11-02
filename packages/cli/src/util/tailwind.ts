import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config.js";

const fullConfig = resolveConfig(tailwindConfig);

export const colors = fullConfig.theme?.colors as Record<string, string>;
export default fullConfig;
