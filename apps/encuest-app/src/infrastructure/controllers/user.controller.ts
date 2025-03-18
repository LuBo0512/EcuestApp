import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { CreateUser } from '../../application/uses-cases/CreateUser';
import { VerifyUserPassword } from '../../application/uses-cases/VerifyUserPassword';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUser,
    private readonly verifyUserPasswordUseCase: VerifyUserPassword,
  ) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Body() createUserDto: { email: string; name: string; password: string },
  ) {
    const { email, name, password } = createUserDto;
    const user = await this.createUserUseCase.execute(email, name, password);
    return { message: 'Usuario creado exitosamente', user };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: { email: string; password: string }) {
    const { email, password } = loginDto;
    const isPasswordValid = await this.verifyUserPasswordUseCase.execute(
      email,
      password,
    );
    if (!isPasswordValid) {
      throw new Error('Contraseña incorrecta');
    }
    return { message: 'Usuario autenticado exitosamente' };
  }
}
