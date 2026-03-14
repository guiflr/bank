import { SignInResponse } from '../auth/dtos/signIn';

export interface Token {
  generateToken(data: SignInResponse): Promise<string>;
}
