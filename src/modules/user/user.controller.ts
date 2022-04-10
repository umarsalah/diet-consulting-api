import { Body, Controller, Post } from '@nestjs/common';

import { Public } from 'src/common/decorators';
import { SignupDto, LoginDto } from './dto';

import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post('signup')
  async signup(@Body() newUserInfo: SignupDto) {
    return this.userService.signup(newUserInfo);
  }

  @Public()
  @Post('login')
  async login(@Body() loginInfo: LoginDto) {
    return this.userService.login(loginInfo);
  }
}
