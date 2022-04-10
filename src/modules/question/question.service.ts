import { Inject, Injectable } from '@nestjs/common';

import { PROVIDERS } from 'src/common/constants';

import { Questions } from './question.model';

@Injectable()
export class QuestionService {
  constructor(
    @Inject(PROVIDERS.QUESTIONS_PROVIDER)
    private readonly questionsRepository: typeof Questions,
  ) {}

  async findAll(pageNr: number): Promise<Questions[]> {
    const questions = await this.questionsRepository.findAll({
      limit: 10,
      offset: pageNr * 10,
      order: [
        ['isAnswered', 'ASC'],
        ['createdAt', 'DESC'],
      ],
    });
    return questions;
  }
}
