import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { User } from '../entities';
import * as argon2 from 'argon2';
import { UserRepository } from '../../infrastructure/repositories/user.repository.impl';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(
    email: string,
    name: string,
    password: string,
  ): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new BadRequestException('El usuario ya existe');
    }

    const passwordHash = await this.hashPassword(password);

    const user = await this.userRepository.save({
      name,
      email,
      passwordHash,
      role: 'user',
      id: '',
    });

    return user;
  }

  private async hashPassword(password: string): Promise<string> {
    return argon2.hash(password);
  }

  async verifyPassword(email: string, password: string): Promise<boolean> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return argon2.verify(user.passwordHash, password);
  }
}
