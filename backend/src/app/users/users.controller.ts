import {Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards} from '@nestjs/common';
import { fillObject } from '@guitar-shop/lib/utils';
import { UsersService } from './users.service';
import { UserSignupDto } from './dto/user-signup.dto';
import { UserRdo } from './rdo/user.rdo';
import { LoggedRdo } from './rdo/logged.rdo';
import { UserLoginDto } from './dto/user-login.dto';
import { AuthGuard } from './auth/auth.guard';
import { UserId } from './auth/user-id.decorator';
import {ApiBearerAuth, ApiResponse, ApiTags} from "@nestjs/swagger";

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.CREATED,
    description: 'User has been successfully created'
  })
  @Post('signup')
  async signup(@Body() dto: UserSignupDto) {
    const newUser = await this.usersService.create(dto);
    return fillObject(UserRdo, newUser);
  }

  @ApiResponse({
    type: LoggedRdo,
    status: HttpStatus.OK,
    description: 'User has been successfully logged'
  })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() dto: UserLoginDto) {
    const loggedUser = await this.usersService.validate(dto);
    const result = this.usersService.login(loggedUser);
    return fillObject(LoggedRdo, result);
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'Фгер гыук штащ'
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @Get('check')
  async check(@UserId() userId: string) {
    const authUser = await this.usersService.getUser(userId);
    return fillObject(UserRdo, authUser);
  }
}
