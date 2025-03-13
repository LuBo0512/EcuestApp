import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../domain/entities';
import { UserService } from 'src/domain/services/auth.service';
import { UserRepository } from 'src/infrastructure/repositories/user.repository.impl';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // o 'mysql'
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'root',
      database: process.env.DB_NAME || 'auth_db',
      entities: [User],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class AppModule {}
