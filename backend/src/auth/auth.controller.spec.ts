import { Test, TestingModule } from '@nestjs/testing';

import { AuthToken } from './auth.token';
import { AuthService } from './auth.service';
import type { SignInDto } from './dtos/signIn';
import { AuthController } from './auth.controller';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: jest.Mocked<AuthService>;
  let authToken: jest.Mocked<AuthToken>;

  beforeEach(async () => {
    authService = {
      signIn: jest.fn(),
    } as unknown as jest.Mocked<AuthService>;

    authToken = {
      generateToken: jest.fn(),
    } as unknown as jest.Mocked<AuthToken>;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: AuthToken, useValue: authToken },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return token when credentials are valid', async () => {
    const signInDto: SignInDto = { username: 'maria', password: 'secret' };
    const user = { id: 'user-1', username: 'maria' };

    authService.signIn.mockResolvedValue(user);
    authToken.generateToken.mockResolvedValue('token-123');

    await expect(controller.signIn(signInDto)).resolves.toEqual({
      token: 'token-123',
    });

    expect(authService.signIn).toHaveBeenCalledWith(signInDto);
    expect(authToken.generateToken).toHaveBeenCalledWith(user);
  });

  it('should propagate errors from signIn', async () => {
    const signInDto: SignInDto = { username: 'maria', password: 'secret' };
    const error = new Error('Invalid credentials');

    authService.signIn.mockRejectedValue(error);

    await expect(controller.signIn(signInDto)).rejects.toBe(error);
    expect(authToken.generateToken).not.toHaveBeenCalled();
  });
});
