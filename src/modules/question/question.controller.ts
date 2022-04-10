import { Controller } from '@nestjs/common';

import { QuestionService } from './question.service';

@Controller()
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}
}
