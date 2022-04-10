import { Inject, Injectable } from '@nestjs/common';
import { PROVIDERS } from 'src/common/constants';
import { Answers } from './answer.model';

@Injectable()
export class AnswerService {
  constructor(
    @Inject(PROVIDERS.ANSWERS_PROVIDER)
    private readonly answersRepository: typeof Answers,
  ) {}

  // Find all answers according to question id
  async findAll(questionId: number): Promise<Answers[]> {
    const answers = await this.answersRepository.findAll({
      where: {
        questionId,
      },
      order: [['createdAt', 'DESC']],
    });
    return answers;
  }
}
