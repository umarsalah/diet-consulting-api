import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';

import { ROLES } from 'src/common/constants';
import { Roles } from 'src/common/decorators';

import { QuestionService } from './question.service';
import { Questions } from './question.model';

@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Roles(ROLES.CONSULTANT)
  @Get(':pageNr')
  async findAll(
    @Param('pageNr', ParseIntPipe) pageNr: number,
  ): Promise<Questions[]> {
    return await this.questionService.findAll(pageNr);
  }

  @Roles(ROLES.CONSULTANT)
  @Get(':questionId')
  async findOne(
    @Param('questionId', ParseIntPipe) questionId: number,
  ): Promise<Questions> {
    return await this.questionService.findOne(questionId);
  }
}
