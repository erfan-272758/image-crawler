import CrawlerUnderwood from "crawler";
import config from "../config";
import sharp from "sharp";
export default class Crawler {
  max_image: number;
  constructor() {
    this.max_image = +(config.env.MAX_IMAGE || 10);
  }
  crawl(q = config.env.QUERY): Promise<Buffer[]> {
    return new Promise((resolve, reject) => {
      const outBuffers: Buffer[] = [];
      const userAgent = [
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.157 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36",
      ];

      const imageCrawler = new CrawlerUnderwood({
        maxConnections: 10,
        retries: 10,
        userAgent,
        encoding: null,
        jQuery: false,
        callback(err, res, done) {
          if (err) {
            console.error(err);
          } else {
            outBuffers.push(res.body as Buffer);
          }
          done();
        },
      });
      const pageCrawler = new CrawlerUnderwood({
        retries: 10,
        maxConnections: 10,
        userAgent,
        callback: (err, res, done) => {
          if (err) {
            console.error(err);
            reject(err);
            return done();
          }
          const $ = res.$;
          const images: string[] = [];
          $(".rg_i.Q4LuWd")
            .toArray()
            .forEach((el, i) => {
              if (el.type === "tag") {
                if (el.attribs["data-src"]) images.push(el.attribs["data-src"]);
              }
            });

          images
            .slice(0, this.max_image)
            .map((link) => imageCrawler.queue(link));

          done();
        },
      });

      pageCrawler.queue(`https://www.google.com/search?q=${q}&tbm=isch`);

      imageCrawler.on("drain", () => {
        return resolve(outBuffers);
      });
    });
  }
  async crawlAndResize(q?: string) {
    const buffers = await this.crawl(q);
    return await Promise.all(
      buffers.map(async (b) => {
        const s = sharp(b);
        return await s
          .resize({ height: 250, width: 250, fit: "cover" })
          .webp({ quality: 80 })
          .toBuffer();
      })
    );
  }
}
