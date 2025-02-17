import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/infrastructure';
import { User } from '../entities';
import argon2 from 'argon2';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: UserRepository,
  ) {}

  async createUser(
    email: string,
    name: string,
    password: string,
  ): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('El usuario ya existe');
    }
    const passWordHash = await this.hashPassword(password);
    const user = new User(name, email, passWordHash, 'user');
    return this.userRepository.save(user);
  }
  private async hashPassword(password: string): Promise<string> {
    return argon2.hash(password);
  }
  async verifyPassword(email: string, password: string): Promise<boolean> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    const isPasswordValid = await argon2.verify(user.passwordHash, password);
    return isPasswordValid;
  }
}
