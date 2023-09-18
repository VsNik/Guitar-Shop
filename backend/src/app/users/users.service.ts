import { BadRequestException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { JwtService } from '@nestjs/jwt';
import { IUser } from '@guitar-shop/lib/types';
import { UserSignupDto } from './dto/user-signup.dto';
import { UserEntity } from './user.entity';
import { UserLoginDto } from './dto/user-login.dto';
import { MailService } from '../mail/mail.service';

const USER_EMAIL_EXIST = 'A user with E-mail address is already exist.';
const INVALID_CREDENTIALS = 'Invalid E-mail and/or Password.'
const USER_NOT_FOUND = 'User not found';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async create(dto: UserSignupDto): Promise<IUser> {
    const existUser = await this.usersRepository.findByEmail(dto.email);

    if (existUser) {
      throw new BadRequestException(USER_EMAIL_EXIST);
    }

    const userEntity = new UserEntity(dto);
    await userEntity.setPassword(dto.password);
    const newUser = await this.usersRepository.save(userEntity);
    await this.mailService.send(dto.name, dto.email, dto.password)

    return newUser;
  }

  async validate(dto: UserLoginDto): Promise<IUser> {
    const existUser = await this.usersRepository.findByEmail(dto.email);

    if (!existUser) {
      throw new UnprocessableEntityException(INVALID_CREDENTIALS);
    }

    const userEntity = new UserEntity(existUser);
    const isValidPassword = await userEntity.comparePassword(dto.password);

    if (!isValidPassword) {
      throw new UnprocessableEntityException(INVALID_CREDENTIALS);
    }

    return userEntity.toObject();
  }

  async getUser(id: string) {
    const existUser = await this.usersRepository.findById(id);

    if (!existUser) {
      throw new NotFoundException(USER_NOT_FOUND);
    }

    return existUser;
  }

  async login(user: IUser) {
    const payload = { id: user.id }
    return {
      token: this.jwtService.sign(payload),
    }
  }
}
