import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';

interface IRequestDTO {
  user_id: string;
  name: string;
  email: string;
  old_password?: string;
  password?: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UserRepository')
    private _userRepository: IUserRepository,
    @inject('HashProvider')
    private _hashProvider: IHashProvider,
  ) {}

  public async execute({
    user_id,
    name,
    email,
    password,
    old_password,
  }: IRequestDTO): Promise<User> {
    const user = await this._userRepository.findById(user_id);
    if (!user) {
      throw new AppError('User not found');
    }

    const userWithUpdatedEmail = await this._userRepository.findByEmail(email);

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user_id) {
      throw new AppError('This email is already in use.');
    }

    if (password && !old_password) {
      throw new AppError(
        'You need to infor the old password to set a new password',
      );
    }

    if (password && old_password) {
      const checkOldPassword = await this._hashProvider.compareHash(
        old_password,
        user.password,
      );

      if (!checkOldPassword) {
        throw new AppError('Old password does not matched');
      }

      user.password = await this._hashProvider.generateHash(password);
    }

    Object.assign(user, {
      name,
      email,
    });

    await this._userRepository.update(user);

    return user;
  }
}

export default UpdateProfileService;
