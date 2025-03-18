import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CreateUser } from './uses-cases/CreateUser';
import { User } from '../domain/entities/user/user.entity';
import { UserRepository } from '../infrastructure/repositories/user.repository.impl';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserRepository, CreateUser],
  exports: [CreateUser],
})
export class UserModule {}
