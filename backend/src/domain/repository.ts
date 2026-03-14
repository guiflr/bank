export interface AuthRepository {
  findUserByUsername(
    username: string,
  ): Promise<{ id: string; username: string; password: string } | null>;
}
