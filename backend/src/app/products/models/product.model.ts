import { GuitarType, IProduct } from '@guitar-shop/lib/types';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class Product implements IProduct {
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
