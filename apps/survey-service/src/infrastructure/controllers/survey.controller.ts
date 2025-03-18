import { Controller, Post, Get, Delete, Param, Body } from '@nestjs/common';
import { SurveyService } from '../../domain/services/survey.service';

@Controller('surveys')
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

  @Post()
  async createSurvey(@Body() body: { title: string; description?: string }) {
    return this.surveyService.createSurvey(body.title, body.description);
  }

  @Get()
  async getAllSurveys() {
    return this.surveyService.getAllSurveys();
  }

  @Get(':id')
  async getSurveyById(@Param('id') id: string) {
    return this.surveyService.getSurveyById(id);
  }

  @Delete(':id')
  async deleteSurvey(@Param('id') id: string) {
    return this.surveyService.deleteSurvey(id);
  }
}
