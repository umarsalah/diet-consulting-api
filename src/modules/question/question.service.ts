import {
  Inject,
  Injectable,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';

import { ERRORS, PROVIDERS } from 'src/common/constants';
import { AnswerService } from '../answer/answer.service';
import { Question } from 'src/common/types';
import { AnswerDto } from './dto/answer.dto';

import { Questions } from './question.model';

@Injectable()
export class QuestionService {
  constructor(
    @Inject(PROVIDERS.QUESTIONS_PROVIDER)
    private questionsRepository: typeof Questions,
    private answersService: AnswerService,
  ) {}

  // Find all questions with pagination and sorting
  async findAll(
    pageNr: number,
    offset: number,
    limit: number,
  ): Promise<Questions[]> {
    try {
      const questions = await this.questionsRepository.findAll({
        limit,
        offset: pageNr * offset,
        order: [
          ['isAnswered', 'ASC'],
          ['createdAt', 'DESC'],
        ],
      });
      return questions;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  // find one question by id
  async findOne(questionId: number): Promise<Questions> {
    return await this.questionsRepository.findOne({
      where: { id: questionId },
    });
  }

  // Find one question by id with it answers
  async findOneWithAnswersAndDraft(
    questionId: number,
    userId: number,
  ): Promise<Question> {
    try {
      const question = await this.questionsRepository.findOne({
        where: { id: questionId },
      });
      if (!question) {
        throw new HttpException(ERRORS.QUESTION_NOT_FOUND, 404);
      }
      const answers = await this.answersService.findAll(questionId);
      const draft = await this.answersService.findDraft(questionId, userId);

      return { question, answers, draft };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  // the default answer for a question is draft
  async createOrUpdateDraftAnswer(
    questionId: number,
    userId: number,
    answer: AnswerDto,
  ): Promise<AnswerDto> {
    const ifQuestion = await this.findOne(questionId);
    if (!ifQuestion) {
      throw new HttpException(ERRORS.QUESTION_NOT_FOUND, 404);
    }
    await this.upsertDraftAnswer(questionId, userId, answer);
    return answer;
  }

  // update a draft answer if found or create it for a question
  async upsertDraftAnswer(
    questionId: number,
    userId: number,
    answer: AnswerDto,
  ): Promise<AnswerDto> {
    try {
      const draft = await this.answersService.findDraft(questionId, userId);
      if (draft) {
        await this.answersService.updateOrPublish(
          questionId,
          userId,
          answer,
          true,
        );
      } else {
        await this.answersService.createDraft(questionId, userId, answer);
      }
      return answer;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  // publish an answer for a question
  async publishTheDraftAnswer(
    questionId: number,
    userId: number,
    answer: AnswerDto,
  ): Promise<AnswerDto> {
    try {
      const ifQuestion = await this.findOne(questionId);
      if (!ifQuestion) {
        throw new HttpException(ERRORS.QUESTION_NOT_FOUND, 404);
      }
      await this.answersService.updateOrPublish(
        questionId,
        userId,
        answer,
        false,
      );
      await this.questionsRepository.update(
        { isAnswered: true },
        { where: { id: questionId } },
      );
      return answer;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
