import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { AUTH_HASH, type AuthHash } from './domain/hash';
import { AUTH_REPOSITORY, type AuthRepository } from './domain/repository';
import { SignInDto, SignInResponse } from './dtos/signIn';

@Injectable()
export class AuthService {
  constructor(
    @Inject(AUTH_REPOSITORY) private readonly authRepository: AuthRepository,
    @Inject(AUTH_HASH) private readonly authHash: AuthHash,
  ) {}

  async signIn(data: SignInDto): Promise<SignInResponse> {
    if (!data?.username || !data?.password) {
      throw new BadRequestException('username and passowrd are required');
    }

    const user = await this.authRepository.findUserByUsername(data.username);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await this.authHash.comparePassword(
      data.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return { id: user.id, username: user.username };
  }
}
