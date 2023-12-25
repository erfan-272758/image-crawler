import { config as dotenvConfig } from "dotenv";
dotenvConfig({ path: ".env.local" });

class Config {
  env: { [key: string]: string } = process.env;

  setupConfig() {}
}

const config = new Config();

export default config;
