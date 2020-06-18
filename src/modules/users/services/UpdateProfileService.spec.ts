import AppError from '@shared/errors/AppError';
import UpdateProfileService from './UpdateProfileService';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfileService: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfileService = new UpdateProfileService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });

  it('Should be able to update the  profile', async () => {
    const user = await fakeUserRepository.create({
      name: 'Jane Doe',
      email: 'janedoe@teste.com',
      password: '123546',
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'Jane Num Doe',
      email: 'janenumdoe@teste.com',
    });

    expect(updatedUser.name).toBe('Jane Num Doe');
    expect(updatedUser.email).toBe('janenumdoe@teste.com');
  });

  it('Should not be able to changed to another user email', async () => {
    await fakeUserRepository.create({
      name: 'John Doe',
      email: 'doe@teste.com',
      password: '123456',
    });

    const { id, name, email } = await fakeUserRepository.create({
      name: 'Jane Doe',
      email: 'doe@teste.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: id,
        name,
        email,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to update the profile if the user does not exist', async () => {
    await expect(
      updateProfileService.execute({
        user_id: 'sa8d8saud8as-a8dasu-de2sa',
        name: 'Jane Num Doe',
        email: 'janenumdoe@teste.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should be able to update the  password', async () => {
    const user = await fakeUserRepository.create({
      name: 'Jane Doe',
      email: 'janedoe@teste.com',
      password: '123456',
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'Jane Num Doe',
      email: 'janenumdoe@teste.com',
      password: '123123',
      old_password: '123456',
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('Should not be able to update the  password without old password', async () => {
    const user = await fakeUserRepository.create({
      name: 'Jane Doe',
      email: 'janedoe@teste.com',
      password: '123546',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'Jane Num Doe',
        email: 'janenumdoe@teste.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to update the  password with wrong old password', async () => {
    const user = await fakeUserRepository.create({
      name: 'Jane Doe',
      email: 'janedoe@teste.com',
      password: '123546',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'Jane Num Doe',
        email: 'janenumdoe@teste.com',
        old_password: 'wrong-password',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
