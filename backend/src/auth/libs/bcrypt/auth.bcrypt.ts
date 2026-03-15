import bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

import { AuthHash } from '../../domain/hash';

@Injectable()
export class Bcrypt implements AuthHash {
  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}
