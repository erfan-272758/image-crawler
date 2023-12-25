import { DataSource } from "typeorm";
import config from ".";
import ImageEntity from "../entity/Image";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: config.env.DB_HOST || "localhost",
  port: +(config.env.DB_PORT || 5432),
  username: config.env.DB_USER,
  password: config.env.DB_PASS,
  database: config.env.DB_NAME || "image-crawler",
  synchronize: true,
  logging: config.env.LOG === "true" ? true : false,
  entities: [ImageEntity],
  subscribers: [],
  migrations: [],
});
