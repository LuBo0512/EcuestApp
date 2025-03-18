import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/domain/entities/question/question.entity';
import { UserRepository } from 'src/infrastructure/repositories/user.repository.impl';
import { CreateUser } from './uses-cases/CreateUser';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserRepository, CreateUser],
  exports: [CreateUser],
})
export class UserModule {}
