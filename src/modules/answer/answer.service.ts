import { Inject, Injectable } from '@nestjs/common';
import { PROVIDERS } from 'src/common/constants';
import { AnswerDto } from '../question/dto/answer.dto';
import { Answers } from './answer.model';

@Injectable()
export class AnswerService {
  constructor(
    @Inject(PROVIDERS.ANSWERS_PROVIDER)
    private readonly answersRepository: typeof Answers,
  ) {}

  // Find all answers according to question id and is not a draft
  async findAll(questionId: number): Promise<Answers[]> {
    const answers = await this.answersRepository.findAll({
      where: { questionId, isDraft: false },
      order: [['createdAt', 'DESC']],
    });
    return answers;
  }

  // find a draft for a question according to user id
  async findDraft(questionId: number, userId: number): Promise<Answers> {
    const answer = await this.answersRepository.findOne({
      where: { questionId, userId, isDraft: true },
    });
    return answer;
  }

  // Create a draft answer for a question
  async createDraft(
    questionId: number,
    userId: number,
    answer: AnswerDto,
  ): Promise<Answers> {
    const newAnswer = await this.answersRepository.create({
      ...answer,
      questionId,
      userId,
      isDraft: true,
      createdBy: userId,
      updatedBy: userId,
    });
    return newAnswer;
  }

  // Update a draft answer for a question
  async updateDraft(
    questionId: number,
    userId: number,
    answer: AnswerDto,
  ): Promise<void> {
    await this.answersRepository.update(
      {
        ...answer,
        isDraft: true,
        updatedBy: userId,
      },
      {
        where: { questionId, userId, isDraft: true },
      },
    );
  }

  // finally publish an answer for a question
  async createAnswer(
    questionId: number,
    userId: number,
    answer: AnswerDto,
  ): Promise<Answers> {
    const newAnswer = await this.answersRepository.create({
      ...answer,
      questionId,
      userId,
      isDraft: false,
      createdBy: userId,
      updatedBy: userId,
    });
    return newAnswer;
  }
}
