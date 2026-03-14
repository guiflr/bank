import { UnauthorizedException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import type { AuthHash } from './domain/hash';
import type { AuthRepository } from './domain/repository';

describe('AuthService', () => {
  let service: AuthService;
  let authRepository: jest.Mocked<AuthRepository>;
  let authHash: jest.Mocked<AuthHash>;

  beforeEach(async () => {
    authRepository = {
      findUserByUsername: jest.fn(),
    };

    authHash = {
      hashPassword: jest.fn(),
      comparePassword: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: 'AuthRepository', useValue: authRepository },
        { provide: 'AuthHash', useValue: authHash },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return user id and username when credentials are valid', async () => {
    const user = {
      id: 'user-1',
      username: 'maria',
      password: 'hashed-password',
    };

    authRepository.findUserByUsername.mockResolvedValue(user);
    authHash.comparePassword.mockResolvedValue(true);

    await expect(
      service.signIn({ username: user.username, password: 'plain-password' }),
    ).resolves.toEqual({ id: user.id, username: user.username });

    expect(authRepository.findUserByUsername).toHaveBeenCalledWith(
      user.username,
    );
    expect(authHash.comparePassword).toHaveBeenCalledWith(
      'plain-password',
      user.password,
    );
  });

  it('should throw UnauthorizedException when user is not found', async () => {
    authRepository.findUserByUsername.mockResolvedValue(null);

    await expect(
      service.signIn({ username: 'missing', password: 'plain-password' }),
    ).rejects.toBeInstanceOf(UnauthorizedException);
  });

  it('should throw UnauthorizedException when password is invalid', async () => {
    const user = {
      id: 'user-2',
      username: 'joao',
      password: 'hashed-password',
    };

    authRepository.findUserByUsername.mockResolvedValue(user);
    authHash.comparePassword.mockResolvedValue(false);

    await expect(
      service.signIn({ username: user.username, password: 'wrong-password' }),
    ).rejects.toBeInstanceOf(UnauthorizedException);

    expect(authHash.comparePassword).toHaveBeenCalledWith(
      'wrong-password',
      user.password,
    );
  });
});
