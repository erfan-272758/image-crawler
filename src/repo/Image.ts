import { Repository } from "typeorm";
import { AppDataSource } from "../config/data-source";
import ImageEntity from "../entity/Image";

export class ImageRepo {
  repo: Repository<ImageEntity>;
  constructor() {
    this.repo = AppDataSource.getRepository(ImageEntity);
  }
  async insert(data: Partial<ImageEntity> | Partial<ImageEntity>[]) {
    await this.repo.save(data as any);
  }
}
export default new ImageRepo();
