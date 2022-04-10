import { Inject, Injectable } from '@nestjs/common';
import { PROVIDERS } from 'src/common/constants';
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
}
