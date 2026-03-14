import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';

import type { AuthHash } from './domain/hash';
import type { AuthRepository } from './domain/repository';
import { SignInDto, SignInResponse } from './dtos/signIn';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AuthRepository') private readonly authRepository: AuthRepository,
    @Inject('AuthHash') private readonly authHash: AuthHash,
  ) {}

  async signIn({ username, password }: SignInDto): Promise<SignInResponse> {
    const user = await this.authRepository.findUserByUsername(username);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await this.authHash.comparePassword(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return { id: user.id, username: user.username };
  }
}
