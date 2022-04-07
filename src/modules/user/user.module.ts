import { Module } from '@nestjs/common';

import { UserService } from './user.service';
import { userProvider } from './user.provider';

@Module({
  providers: [...userProvider, UserService],
})
export class UserModule {}
