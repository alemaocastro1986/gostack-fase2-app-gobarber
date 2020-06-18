import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

interface IRequestDTO {
  user_id: string;
  avatarFilename: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UserRepository')
    private _userRepository: IUserRepository,
    @inject('StorageProvider')
    private _storageProvider: IStorageProvider,
  ) {}

  public async execute({
    user_id,
    avatarFilename,
  }: IRequestDTO): Promise<User> {
    const user = await this._userRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only athenticated users can change avatar.', 401);
    }

    if (user.avatar) {
      await this._storageProvider.deleteFile(user.avatar);
    }

    const fileName = await this._storageProvider.saveFile(avatarFilename);

    user.avatar = fileName;
    await this._userRepository.update(user);

    return user;
  }
}

export default UpdateUserAvatarService;
