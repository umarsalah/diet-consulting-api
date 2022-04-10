import { Module } from '@nestjs/common';

import { AnswerModule } from '../answer/answer.module';

import { QuestionController } from './question.controller';
import { questionProvider } from './question.provider';
import { QuestionService } from './question.service';

@Module({
  imports: [AnswerModule],
  controllers: [QuestionController],
  providers: [QuestionService, ...questionProvider],
  exports: [QuestionService],
})
export class QuestionModule {}
