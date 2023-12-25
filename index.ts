import Crawler from "./src/crawler";
import config from "./src/config";

async function main() {
  // setup config
  await config.setupConfig();

  // crawl
  const crawler = new Crawler();
  const buffers = await crawler.crawlAndResize();
  console.log(buffers);
}

main();
