import Crawler from "./src/crawler";
import config from "./src/config";
import { AppDataSource } from "./src/config/data-source";
import ImageEntity from "./src/entity/Image";
import imageRepo from "./src/repo/Image";

async function main() {
  // setup config
  config.setupConfig();
  await AppDataSource.initialize();
  console.log("DB connected");

  // crawl
  const crawler = new Crawler();
  const buffers = await crawler.crawlAndResize();

  //   save to db
  await imageRepo.insert(
    buffers.map((data) => {
      const image = new ImageEntity();
      image.data = data;
      image.query = config.env.QUERY;
      return image;
    })
  );
}

main();
