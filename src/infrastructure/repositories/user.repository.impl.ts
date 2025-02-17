import { User } from 'src/domain/entities';

export interface UserRepository {
  save(user: User): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  update(id: string, user: Partial<User>): Promise<User | null>;
  delete(id: string): Promise<boolean>;
}
