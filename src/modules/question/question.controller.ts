import {
  Get,
  Put,
  Body,
  Post,
  Param,
  Query,
  Controller,
  ParseIntPipe,
} from '@nestjs/common';

import { ROLES } from 'src/common/enums';
import { Question } from 'src/common/types';
import { Roles, User } from 'src/common/decorators';

import { QuestionService } from './question.service';
import { Questions } from './question.model';
import { AnswerDto } from './dto/answer.dto';

@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Roles(ROLES.CONSULTANT)
  @Get()
  findAll(
    @Query('pageNr') pageNr?: number,
    @Query('offset') offset?: number,
    @Query('limit') limit?: number,
  ): Promise<Questions[]> {
    return this.questionService.findAll(pageNr, offset || 10, limit || 10);
  }

  @Roles(ROLES.CONSULTANT)
  @Get(':questionId')
  findOne(
    @Param('questionId', ParseIntPipe) questionId: number,
    @User() user: { id: number },
  ): Promise<Question> {
    return this.questionService.findOneWithAnswersAndDraft(questionId, user.id);
  }
  @Roles(ROLES.CONSULTANT)
  @Put('/:questionId/answers')
  createOrUpdateDraftAnswer(
    @Param('questionId', ParseIntPipe) questionId: number,
    @User() user: { id: number },
    @Body() answer: AnswerDto,
  ): Promise<AnswerDto> {
    return this.questionService.createOrUpdateDraftAnswer(
      questionId,
      user.id,
      answer,
    );
  }

  @Roles(ROLES.CONSULTANT)
  @Post('/:questionId/answers')
  publishAnswer(
    @Param('questionId', ParseIntPipe) questionId: number,
    @User() user: { id: number },
    @Body() answer: AnswerDto,
  ): Promise<AnswerDto> {
    return this.questionService.publishTheDraftAnswer(
      questionId,
      user.id,
      answer,
    );
  }
}
