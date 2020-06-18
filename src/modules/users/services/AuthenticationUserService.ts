import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import authConfig from '@shared/config/auth';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequestDTO {
  email: string;
  password: string;
}

interface IResponseDTO {
  user: User;
  token: string;
}

@injectable()
class AuthenticationSessionService {
  constructor(
    @inject('UserRepository')
    private _userRepository: IUserRepository,
    @inject('HashProvider')
    private _hashProvider: IHashProvider,
  ) {}

  public async execute({
    email,
    password,
  }: IRequestDTO): Promise<IResponseDTO> {
    const user = await this._userRepository.findByEmail(email);

    if (!user) {
      throw new AppError(
        'Incorrect email/password verify your credentials.',
        401,
      );
    }

    const passwordMatched = await this._hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatched) {
      throw new AppError(
        'Incorrect email/password verify your credentials.',
        401,
      );
    }
    const { expiresIn, secret } = authConfig.jwt;
    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticationSessionService;
