import { UserService } from 'src/domain';
import { User } from 'src/domain/entities';
import { UserRepository } from 'src/infrastructure';

export class LoginUser {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userService: UserService,
  ) {}

  async execute(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    const isPasswordValid = await this.userService.verifyPassword(
      password,
      user.passwordHash,
    );
    if (!isPasswordValid) {
      throw new Error('Contraseña incorrecta');
    }

    return user;
  }
}
