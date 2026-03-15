import { Module } from '@nestjs/common';

import { AUTH_TOKEN } from './domain/token';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { KnexModule } from '../infra/knex/knex.module';
import { AuthKnexRepository } from './infra/knex/auth.knex.repository';
import { Bcrypt } from './libs/bcrypt/auth.bcrypt';
import { AuthJwt } from './libs/jwt/auth.jwt';
import { AUTH_HASH } from './domain/hash';
import { AUTH_REPOSITORY } from './domain/repository';

@Module({
  imports: [KnexModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: AUTH_TOKEN,
      useExisting: AuthJwt,
    },
    {
      provide: AUTH_HASH,
      useExisting: Bcrypt,
    },
    {
      provide: AUTH_REPOSITORY,
      useExisting: AuthKnexRepository,
    },
  ],
})
export class AuthModule {}
