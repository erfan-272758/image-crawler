import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class ImageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
  })
  query: string;

  @Column({
    type: "bytea",
  })
  data: Uint8Array;
}
