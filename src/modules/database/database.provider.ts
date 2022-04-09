import { ConfigService } from '@nestjs/config';
import { Sequelize } from 'sequelize-typescript';

import { PROVIDERS, CONFIG } from '../../common/constants';

import { Questions } from '../question/question.model';
import { Answers } from '../answer/answer.model';
import { Users } from '../user/user.model';

export const databaseProviders = [
  {
    provide: PROVIDERS.DATABASE_PROVIDER,
    useFactory: (configService: ConfigService) => {
      const sequelize = new Sequelize({
        ...configService.get(CONFIG.DATABASE),
      });
      sequelize.addModels([Users, Answers, Questions]);
      return sequelize;
    },
    inject: [ConfigService],
  },
];
