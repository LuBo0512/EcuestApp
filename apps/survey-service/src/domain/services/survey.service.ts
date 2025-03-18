import { Injectable, NotFoundException } from '@nestjs/common';
import { ISurveyRepository } from '../interfaces/ISurveyRepository';
import { Survey } from '../entities/survey/survey..entity';

@Injectable()
export class SurveyService {
  constructor(private readonly surveyRepository: ISurveyRepository) {}

  async createSurvey(title: string, description?: string): Promise<Survey> {
    return await this.surveyRepository.create(title, description);
  }

  async getAllSurveys(): Promise<Survey[]> {
    return await this.surveyRepository.findAll();
  }

  async getSurveyById(id: string): Promise<Survey> {
    const survey = await this.surveyRepository.findById(id);
    if (!survey) throw new NotFoundException('Survey not found');
    return survey;
  }

  async deleteSurvey(id: string): Promise<void> {
    const survey = await this.surveyRepository.findById(id);
    if (!survey) throw new NotFoundException('Survey not found');
    await this.surveyRepository.delete(id);
  }
}
