import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {GuitarType} from "@guitar-shop/lib/types";

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @Column({ type: 'enum', enum: GuitarType })
  type: GuitarType;

  @Column()
  stringCount: number;

  @Column()
  price : number;

  @Column()
  ean: string;

  @Column()
  createdAt: string;
}
