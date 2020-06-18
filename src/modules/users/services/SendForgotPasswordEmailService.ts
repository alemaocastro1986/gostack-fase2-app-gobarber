import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import IMailProvider from '@providers/MailProvider/models/IMailProvider';
import IUserRepository from '@modules/users/repositories/IUserRepository';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';

interface IRequestDTO {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UserRepository')
    private _userRepository: IUserRepository,
    @inject('MailProvider')
    private _mailProvider: IMailProvider,
    @inject('UserTokensRepository')
    private _userTokensRepository: IUserTokensRepository,
  ) {}

  public async execute({ email }: IRequestDTO): Promise<void> {
    const userExists = await this._userRepository.findByEmail(email);

    if (!userExists) {
      throw new AppError('User does not exists!', 400);
    }

    await this._userTokensRepository.generate(userExists.id);

    this._mailProvider.sendMail({ to: email, body: 'hello mail' });
  }
}

export default SendForgotPasswordEmailService;
