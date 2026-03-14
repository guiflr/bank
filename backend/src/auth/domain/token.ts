import { SignInResponse } from '../dtos/signIn';

export const AUTH_TOKEN = 'AUTH_TOKEN';

export interface AuthToken {
  generateToken(data: SignInResponse): Promise<string>;
}
