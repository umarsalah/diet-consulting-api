import { Module } from '@nestjs/common';

import { QuestionController } from './question.controller';
import { questionProvider } from './question.provider';
import { QuestionService } from './question.service';

@Module({
  controllers: [QuestionController],
  providers: [QuestionService, ...questionProvider],
  exports: [QuestionService],
})
export class QuestionModule {}
