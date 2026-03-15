import request from 'supertest';
import { App } from 'supertest/types';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, UnauthorizedException } from '@nestjs/common';

import { AuthService } from '../src/auth/auth.service';
import { AuthController } from '../src/auth/auth.controller';
import { AUTH_TOKEN, type AuthToken } from '../src/auth/domain/token';

describe('AuthController (e2e)', () => {
  let app: INestApplication<App>;
  let authService: jest.Mocked<AuthService>;
  let authToken: jest.Mocked<AuthToken>;

  beforeEach(async () => {
    authService = {
      signIn: jest.fn(),
    } as unknown as jest.Mocked<AuthService>;

    authToken = {
      generateToken: jest.fn(),
    } as unknown as jest.Mocked<AuthToken>;

    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: AUTH_TOKEN, useValue: authToken },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/auth/signin (POST) returns token for valid credentials', async () => {
    authService.signIn.mockResolvedValue({ id: 'user-1', username: 'maria' });
    authToken.generateToken.mockResolvedValue('jwt-token');

    await request(app.getHttpServer())
      .post('/auth/signin')
      .send({ username: 'maria', password: 'plain-password' })
      .expect(201)
      .expect({ token: 'jwt-token' });

    expect(authService.signIn).toHaveBeenCalledWith({
      username: 'maria',
      password: 'plain-password',
    });
    expect(authToken.generateToken).toHaveBeenCalledWith({
      id: 'user-1',
      username: 'maria',
    });
  });

  it('/auth/signin (POST) returns 401 for invalid credentials', async () => {
    authService.signIn.mockRejectedValue(
      new UnauthorizedException('Invalid credentials'),
    );

    await request(app.getHttpServer())
      .post('/auth/signin')
      .send({ username: 'maria', password: 'wrong-password' })
      .expect(401);
  });
});
