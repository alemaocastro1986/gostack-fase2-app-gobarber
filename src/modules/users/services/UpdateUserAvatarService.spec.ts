import AppError from '@shared/errors/AppError';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import UpdatedUserAvatarService from './UpdateUserAvatarService';
import CreateUserService from './CreateUserService';

let fakeStorageProvider: FakeStorageProvider;
let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;

describe('UpdatedUserAvatar', () => {
  beforeEach(() => {
    fakeStorageProvider = new FakeStorageProvider();
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();

    createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });
  it('Should return an user with avatar file path', async () => {
    const user = await createUserService.execute({
      name: 'John Doe',
      email: 'jd@teste.com.br',
      password: '123456',
    });

    const updatedUserAvatarService = new UpdatedUserAvatarService(
      fakeUserRepository,
      fakeStorageProvider,
    );
    const filename = `my_avatar${new Date().getTime()}`;
    const userWithAvatar = await updatedUserAvatarService.execute({
      avatarFilename: filename,
      user_id: user.id,
    });

    expect(userWithAvatar.id).toEqual(user.id);
    expect(userWithAvatar.avatar).toEqual(filename);
  });

  it('should return an error as it cannot update non-existent users', async () => {
    const updatedUserAvatarService = new UpdatedUserAvatarService(
      fakeUserRepository,
      fakeStorageProvider,
    );

    await expect(
      updatedUserAvatarService.execute({
        avatarFilename: 'john-doe-face.png',
        user_id: '154888es-cdsa5844-cdsdds894-tr35fredd',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("Should update the user's avatar by deleting the previous avatar.", async () => {
    const funcDeleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const user = await createUserService.execute({
      name: 'John Doe',
      email: 'jd@teste.com.br',
      password: '123456',
    });

    const updatedUserAvatarService = new UpdatedUserAvatarService(
      fakeUserRepository,
      fakeStorageProvider,
    );
    const filename = `my_avatar${new Date().getTime()}`;
    await updatedUserAvatarService.execute({
      avatarFilename: filename,
      user_id: user.id,
    });

    const userNewAvatar = await updatedUserAvatarService.execute({
      avatarFilename: 'new-avatar.png',
      user_id: user.id,
    });

    expect(funcDeleteFile).toHaveBeenCalledWith(filename);

    expect(userNewAvatar.avatar).toEqual('new-avatar.png');
  });
});
