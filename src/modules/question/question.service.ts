import { Inject, Injectable } from '@nestjs/common';

import { PROVIDERS } from 'src/common/constants';

import { Questions } from './question.model';

@Injectable()
export class QuestionService {
  constructor(
    @Inject(PROVIDERS.QUESTIONS_PROVIDER)
    private readonly questionsRepository: typeof Questions,
  ) {}
}
