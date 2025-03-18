import { User } from '../../domain/entities';
import { UserService } from '../../domain/services/auth.service';

export class CreateUser {
  constructor(private readonly userService: UserService) {}

  async execute(email: string, name: string, password: string): Promise<User> {
    return await this.userService.createUser(email, name, password);
  }
}
