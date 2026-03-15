import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AUTH_TOKEN } from './domain/token';
import type { AuthToken } from './domain/token';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject(AUTH_TOKEN) private readonly authToken: AuthToken) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = this.extractToken(request);
    if (!token) {
      throw new UnauthorizedException('Token Not Provided');
    }

    const payload = await this.authToken.extractDataFromToken(token);

    if (!payload) {
      throw new UnauthorizedException('Invalid Token');
    }

    request['user'] = payload;

    return true;
  }

  private extractToken(request: Request): string | undefined {
    const [_, token] = request.headers['authorization']?.split(' ') || [];

    return token;
  }
}
