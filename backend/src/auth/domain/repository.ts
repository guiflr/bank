export const AUTH_REPOSITORY = 'AUTH_REPOSITORY';

export interface AuthRepository {
  findUserByUsername(
    username: string,
  ): Promise<{ id: string; username: string; password: string } | null>;
}
