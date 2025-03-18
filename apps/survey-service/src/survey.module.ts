import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Survey } from './domain/entities/survey/survey..entity';
import { SurveyController } from './infrastructure/controllers/survey.controller';
import { SurveyService } from './domain/services/survey.service';
import { SurveyRepository } from './infrastructure/repositories/survey.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Survey])],
  controllers: [SurveyController],
  providers: [
    SurveyService,
    { provide: 'ISurveyRepository', useClass: SurveyRepository },
  ],
  exports: [SurveyService],
})
export class SurveyModule {}
