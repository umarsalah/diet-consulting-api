import { PROVIDERS } from 'src/common/constants';

import { Answers } from './answer.model';

export const answerProvider = [
  {
    provide: PROVIDERS.ANSWERS_PROVIDER,
    useValue: Answers,
  },
];
