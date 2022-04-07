import { Users } from './user.model';

import { PROVIDERS } from 'src/common/constants';

export const userProvider = [
  {
    provide: PROVIDERS.USERS_PROVIDER,
    useValue: Users,
  },
];
