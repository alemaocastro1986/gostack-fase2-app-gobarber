// import 'reflect-metadata';
import AppError from '@shared/errors/AppError';

import CreateUserService from './CreateUserService';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;
describe('CreateUsers', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });
  it('Should return a new user', async () => {
    const user = await createUserService.execute({
      name: 'John Doo',
      email: 'john-doo@gobarber.com.br',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('email');
    expect(user).toHaveProperty('password');
  });

  it('should not be possible to create a user with the existing email', async () => {
    await createUserService.execute({
      name: 'John Doo',
      email: 'john-doo@gobarber.com.br',
      password: '123456',
    });

    await expect(
      createUserService.execute({
        name: 'John Doo',
        email: 'john-doo@gobarber.com.br',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
