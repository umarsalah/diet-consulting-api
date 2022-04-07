import { ConfigModule } from '@nestjs/config';

import { Module } from '@nestjs/common';

import { PatientModule } from './modules/patient/patient.module';
import { DatabaseModule } from './modules/database/database.module';
import { QuestionModule } from './modules/question/question.module';
import { ConsultantModule } from './modules/consultant/consultant.module';

import config from 'config';

@Module({
  imports: [
    PatientModule,
    DatabaseModule,
    QuestionModule,
    ConsultantModule,
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
