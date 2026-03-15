import jwt from 'jsonwebtoken';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SECRET_KEY } from '../../constants';

import { AuthToken } from '../../domain/token';
import { SignInResponse } from '../../dtos/signIn';

@Injectable()
export class AuthJwt implements AuthToken {
  async generateToken(data: SignInResponse): Promise<string> {
    const token = jwt.sign(data, SECRET_KEY, { expiresIn: '1h' });

    return token;
  }

  async extractDataFromToken(token: string): Promise<SignInResponse | null> {
    try {
      const data = jwt.verify(token, SECRET_KEY);

      if (typeof data === 'string') {
        return null;
      }

      return data as SignInResponse;
    } catch {
      return null;
    }
  }
}
