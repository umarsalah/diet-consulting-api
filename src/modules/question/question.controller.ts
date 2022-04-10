import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Body,
} from '@nestjs/common';

import { Question, ROLES } from 'src/common/constants';
import { Roles, User } from 'src/common/decorators';

import { QuestionService } from './question.service';
import { Questions } from './question.model';
import { AnswerDto } from './dto/answer.dto';

@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Roles(ROLES.CONSULTANT)
  @Get()
  findAll(@Query('pageNr', ParseIntPipe) pageNr: number): Promise<Questions[]> {
    return this.questionService.findAll(pageNr);
  }

  @Roles(ROLES.CONSULTANT)
  @Get(':questionId')
  findOne(
    @Param('questionId', ParseIntPipe) questionId: number,
    @User() user: { id: number },
  ): Promise<Question> {
    return this.questionService.findOne(questionId, user.id);
  }
  @Roles(ROLES.CONSULTANT)
  @Post('/:questionId/answers')
  createAnswer(
    @Param('questionId', ParseIntPipe) questionId: number,
    @User() user: { id: number },
    @Body() answer: AnswerDto,
  ): Promise<AnswerDto> {
    return this.questionService.createDraftAnswer(questionId, user.id, answer);
  }
}
