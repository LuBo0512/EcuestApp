import { UserService } from 'src/domain';
import { User } from 'src/domain/entities';

export class CreateUser {
  constructor(private readonly userService: UserService) {}

  async execute(email: string, name: string, password: string): Promise<User> {
    return await this.userService.createUser(email, name, password);
  }
}
