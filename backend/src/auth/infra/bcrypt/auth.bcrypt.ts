import bcrypr from 'bcrypt';

import { AuthHash } from 'src/auth/domain/hash';

export class Bcrypt implements AuthHash {
  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypr.hash(password, saltRounds);
  }

  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypr.compare(password, hashedPassword);
  }
}
