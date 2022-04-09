import { Body, Controller, Post } from '@nestjs/common';
import { Public } from 'src/common/decorators';

import { UserService } from './user.service';

import { SignupDto } from './dto/signup.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post('signup')
  async signup(@Body() newUserInfo: SignupDto) {
    return this.userService.signup(newUserInfo);
  }
}
