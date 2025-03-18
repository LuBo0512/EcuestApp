import { NestFactory } from '@nestjs/core';
import { SurveyServiceModule } from './survey-service.module';

async function bootstrap() {
  const app = await NestFactory.create(SurveyServiceModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
