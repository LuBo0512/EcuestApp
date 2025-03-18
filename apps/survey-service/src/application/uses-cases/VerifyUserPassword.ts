import { UserService } from 'src/domain';
import { UserRepository } from 'src/infrastructure';

export class VerifyUserPassword {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userService: UserService,
  ) {}

  async execute(email: string, password: string): Promise<boolean> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error('El usuario no existe');
    }
    const isPasswordValid = await this.userService.verifyPassword(
      password,
      user.passwordHash,
    );

    return isPasswordValid;
  }
}
