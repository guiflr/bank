import { SignInResponse } from '../dtos/signIn';

export interface Token {
  generateToken(data: SignInResponse): Promise<string>;
}
