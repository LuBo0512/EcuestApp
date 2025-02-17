import { Module } from '@nestjs/common';
import { UserService } from '../domain';
import { UserRepository } from '../infrastructure';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../domain/entities';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'yourUsername',
      password: 'yourPassword',
      database: 'yourDatabase',
      entities: [User],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [],
  providers: [UserService, UserRepository],
})
export class AppModule {}
