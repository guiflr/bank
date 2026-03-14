import { Body, Controller, Post } from '@nestjs/common';

import { AuthToken } from './auth.token';
import { AuthService } from './auth.service';
import type { SignInDto } from './dtos/signIn';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly authToken: AuthToken,
  ) {}

  @Post('signin')
  async signIn(@Body() body: SignInDto): Promise<{ token: string }> {
    const user = await this.authService.signIn(body);
    const token = await this.authToken.generateToken(user);
    return { token };
  }
}
