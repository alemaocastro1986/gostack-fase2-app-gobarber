import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUserRepository from '@modules/users/repositories/IUserRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequestDTO {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UserRepository')
    private _userRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ name, email, password }: IRequestDTO): Promise<User> {
    const checkIfUsersExists = await this._userRepository.findByEmail(email);

    if (checkIfUsersExists) {
      throw new AppError('Email address already in use');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this._userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
