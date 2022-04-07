import { ConfigModule } from '@nestjs/config';

import { Module } from '@nestjs/common';

import { UserModule } from './modules/user/user.module';
import { AnswerModule } from './modules/answer/answer.module';
import { DatabaseModule } from './modules/database/database.module';
import { QuestionModule } from './modules/question/question.module';

import config from 'config';

@Module({
  imports: [
    UserModule,
    AnswerModule,
    DatabaseModule,
    QuestionModule,
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
