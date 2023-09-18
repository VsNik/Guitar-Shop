import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IUser } from '@guitar-shop/lib/types';

@Entity('users')
export class User implements IUser{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  createdAt: string;
}
