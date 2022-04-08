import { ConfigService } from '@nestjs/config';
import { Sequelize } from 'sequelize-typescript';

import { PROVIDERS, CONFIG } from '../../common/constants';

export const databaseProviders = [
  {
    provide: PROVIDERS.DATABASE_PROVIDER,
    useFactory: (configService: ConfigService) => {
      const sequelize = new Sequelize({
        ...configService.get(CONFIG.DATABASE),
      });
      sequelize.addModels([]);
      return sequelize;
    },
    inject: [ConfigService],
  },
];
