import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "@guitar-shop/lib/models";
import {Repository} from "typeorm";
import {genSalt, hash} from 'bcryptjs';
import {randomUUID} from "crypto";

const DEFAULT_NAME = 'admin';
const DEFAULT_PASSWORD = 'admin';
const DEFAULT_EMAIL = 'admin@example.test';
const COAST_PASSWORD = 12;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async createDefaultUser() {
    const passSalt = await genSalt(COAST_PASSWORD);
    const password = await hash(DEFAULT_PASSWORD, passSalt);
    return {
      id: randomUUID(),
      name: DEFAULT_NAME,
      email: DEFAULT_EMAIL,
      password,
      createdAt: new Date().toISOString(),
    }
  }

  async clearUsers() {
    await this.usersRepository.createQueryBuilder('users')
      .delete()
      .where([])    //  empty array
      .execute();
  }

  async saveUser() {
    const user = await this.createDefaultUser();
    await this.usersRepository.createQueryBuilder('users')
      .insert()
      .values(user)
      .execute();
  }

  async create() {
    await this.clearUsers();
    await this.saveUser();
  }
}
