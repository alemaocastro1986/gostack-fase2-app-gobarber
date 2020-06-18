import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import ResetPasswordService from './ResetPasswordService';

let fakeUserRepository: FakeUserRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeHashProvider: FakeHashProvider;
let resetPasswordService: ResetPasswordService;

describe('ResetPassword', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeHashProvider = new FakeHashProvider();
    resetPasswordService = new ResetPasswordService(
      fakeUserRepository,
      fakeUserTokensRepository,
      fakeHashProvider,
    );
  });

  it('Should be able reset password', async () => {
    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'john-doe@teste.com',
      password: '123456',
    });

    const userToken = await fakeUserTokensRepository.generate(user.id);
    await resetPasswordService.execute({
      password: '654321',
      token: userToken.token,
    });

    const updatedUser = await fakeUserRepository.findById(user.id);

    expect(generateHash).toHaveBeenCalledWith('654321');
    expect(updatedUser?.password).toBe('654321');
  });

  it('Should not be able reset password with non-exists token', async () => {
    await expect(
      resetPasswordService.execute({
        password: '654321',
        token: 'non-existing-token',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('Should not be able reset password with non-exists user', async () => {
    const userToken = await fakeUserTokensRepository.generate('non-user');
    await expect(
      resetPasswordService.execute({
        password: '654321',
        token: userToken.token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to reset password if passed more than 2 hours', async () => {
    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'john-doe@teste.com',
      password: '123456',
    });

    const userToken = await fakeUserTokensRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPasswordService.execute({
        password: '123123',
        token: userToken.token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

/**
 * hash
 * expiração 2h
 * não existência de token
 * não existencia de usuário
 */
