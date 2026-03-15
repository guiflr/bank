export const AUTH_HASH = 'AUTH_HASH';

export interface AuthHash {
  hashPassword(password: string): Promise<string>;
  comparePassword(password: string, hashedPassword: string): Promise<boolean>;
}
