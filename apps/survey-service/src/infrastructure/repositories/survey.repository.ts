import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ISurveyRepository } from '../../domain/interfaces/ISurveyRepository';
import { Survey } from '../../domain/entities/survey/survey..entity';

@Injectable()
export class SurveyRepository implements ISurveyRepository {
  constructor(
    @InjectRepository(Survey)
    private readonly surveyRepo: Repository<Survey>,
  ) {}

  async create(title: string, description?: string): Promise<Survey> {
    const survey = this.surveyRepo.create({ title, description });
    return await this.surveyRepo.save(survey);
  }

  async findAll(): Promise<Survey[]> {
    return await this.surveyRepo.find();
  }

  async findById(id: string): Promise<Survey | null> {
    return await this.surveyRepo.findOne({ where: { id } });
  }

  async delete(id: string): Promise<void> {
    await this.surveyRepo.delete(id);
  }
}
