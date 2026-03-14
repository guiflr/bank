import { Inject, Injectable } from '@nestjs/common';
import type { Token } from './domain/token';
import { SignInResponse } from './dtos/signIn';

@Injectable()
export class AuthToken {
  constructor(@Inject('Token') private readonly token: Token) {}

  async generateToken(data: SignInResponse): Promise<string> {
    return this.token.generateToken(data);
  }
}
