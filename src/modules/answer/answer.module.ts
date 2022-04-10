import { Module } from '@nestjs/common';

import { answerProvider } from './answer.provider';
import { AnswerService } from './answer.service';

@Module({
  providers: [...answerProvider, AnswerService],
  exports: [AnswerService],
})
export class AnswerModule {}
