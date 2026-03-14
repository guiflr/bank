export interface SignInDto {
  username: string;
  password: string;
}

export class SignInResponse {
  id: string;
  username: string;
}
