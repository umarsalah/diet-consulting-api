import { Questions } from './question.model';

import { PROVIDERS } from 'src/common/constants';

export const questionProvider = [
  {
    provide: PROVIDERS.QUESTIONS_PROVIDER,
    useValue: Questions,
  },
];
