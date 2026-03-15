import jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { SECRET_KEY } from '../../constants';

import { AuthToken } from '../../domain/token';
import { SignInResponse } from '../../dtos/signIn';

@Injectable()
export class AuthJwt implements AuthToken {
  async generateToken(data: SignInResponse): Promise<string> {
    const token = jwt.sign(data, SECRET_KEY, { expiresIn: '1h' });

    return token;
  }
}
