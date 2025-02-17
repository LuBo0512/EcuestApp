import { UserRepository } from 'src/infrastructure';
import { User } from '../entities';
import argon2 from 'argon2';

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

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
    const user = new User(this.generateId(), name, email, passWordHash, 'user');
    return this.userRepository.save(user);
  }
  private async hashPassword(password: string): Promise<string> {
    return argon2.hash(password);
  }

  private generateId(): string {
    return crypto.randomUUID();
  }
}
