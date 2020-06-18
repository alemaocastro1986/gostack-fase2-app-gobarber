import AppError from '@shared/errors/AppError';

import AuthenticationUserService from './AuthenticationUserService';
import CreateUserService from './CreateUserService';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUserService: AuthenticationUserService;
let createUserService: CreateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    authenticateUserService = new AuthenticationUserService(
      fakeUserRepository,
      fakeHashProvider,
    );
    createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });
  it('Should be able to authenticate', async () => {
    const user = await createUserService.execute({
      name: 'John Doe',
      email: 'john_doe@gobarber.com.br',
      password: '123456',
    });

    const response = await authenticateUserService.execute({
      email: 'john_doe@gobarber.com.br',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('this should return an instance of AppError, as it cannot find a registered user', async () => {
    await expect(
      authenticateUserService.execute({
        email: 'john_doe@gobarber.com.br',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should return an instance of AppError, when entering an incorrect password', async () => {
    await createUserService.execute({
      name: 'John Doe',
      email: 'john_doe@gobarber.com.br',
      password: '123456',
    });

    await expect(
      authenticateUserService.execute({
        email: 'john_doe@gobarber.com.br',
        password: 'incorrect',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
