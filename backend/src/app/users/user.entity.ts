import {compare, genSalt, hash} from 'bcryptjs';
import { IUser } from '@guitar-shop/lib/types';

const COAST_PASSWORD = 12;

export class UserEntity implements IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;

  constructor(entity: Partial<IUser>) {
    this.id = entity.id ;
    this.name = entity.name;
    this.email = entity.email;
    this.password = entity.password;
    this.createdAt = entity.createdAt ?? new Date().toISOString();
  }

  public async setPassword(password: string): Promise<void> {
    const salt = await genSalt(COAST_PASSWORD);
    this.password = await hash(password, salt);
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.password);
  }

  public toObject(): IUser {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.password,
      createdAt: this.createdAt,
    };
  }
}
