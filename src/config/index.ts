import { config as dotenvConfig } from "dotenv";

class Config {
  env: { [key: string]: string } = {};

  async setupConfig() {
    dotenvConfig({ path: ".env.local", processEnv: this.env });
  }
}

const config = new Config();

export default config;
