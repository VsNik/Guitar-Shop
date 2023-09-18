import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUser } from '@guitar-shop/lib/types';
import { User } from './models/user.model';
import { UserEntity } from './user.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  public async save(entity: UserEntity): Promise<IUser> {
    return this.usersRepository.save(entity);
  }

  public async findById(id: string): Promise<IUser> {
    return this.usersRepository.findOneBy({ id });
  }

  public async findByEmail(email: string): Promise<IUser> {
    return this.usersRepository.findOneBy({email});
  }
}
