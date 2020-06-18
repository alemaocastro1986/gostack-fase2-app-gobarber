import { injectable, inject } from 'tsyringe';
import { isAfter, addHours } from 'date-fns';

import AppError from '@shared/errors/AppError';

import IUserRepository from '../repositories/IUserRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequestDTO {
  password: string;
  token: string;
}
@injectable()
export default class ResetPasswordService {
  constructor(
    @inject('UserRepository')
    private _userRepository: IUserRepository,
    @inject('UserTokensRepository')
    private _userTokenRepository: IUserTokensRepository,
    @inject('HashProvider')
    private _hashProvider: IHashProvider,
  ) {}

  public async execute({ password, token }: IRequestDTO): Promise<void> {
    const userToken = await this._userTokenRepository.findByToken(token);
    if (!userToken) {
      throw new AppError('User token does not exists!', 401);
    }
    const user = await this._userRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User does not exists!!', 401);
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired', 401);
    }

    user.password = await this._hashProvider.generateHash(password);

    await this._userRepository.update(user);
  }
}
