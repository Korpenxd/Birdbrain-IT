import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const projectRoot = process.env.SITES_PROJECT_ROOT ?? process.cwd();
const configPath = resolve(projectRoot, "dist/server/wrangler.json");
const config = JSON.parse(await readFile(configPath, "utf8"));

// Cloudflare enables Node.js compatibility by default from 2026-08-04.
// Omit the legacy field entirely so the deployment API uses that default.
delete config.compatibility_flags;

await writeFile(configPath, `${JSON.stringify(config)}\n`, "utf8");
