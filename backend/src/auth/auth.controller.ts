import { Body, Controller, Inject, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import type { SignInDto } from './dtos/signIn';
import { AUTH_TOKEN, type AuthToken } from './domain/token';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject(AUTH_TOKEN) private readonly authToken: AuthToken,
  ) {}

  @Post('signin')
  async signIn(@Body() body: SignInDto): Promise<{ token: string }> {
    const user = await this.authService.signIn(body);
    const token = await this.authToken.generateToken(user);
    return { token };
  }
}
