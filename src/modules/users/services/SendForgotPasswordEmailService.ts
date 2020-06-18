import { injectable, inject } from 'tsyringe';
import { resolve } from 'path';
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
    const user = await this._userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists!', 400);
    }

    const { token } = await this._userTokensRepository.generate(user.id);

    const templateForgotPassword = resolve(
      __dirname,
      '..',
      'templates',
      'forgot_password.hbs',
    );
    await this._mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[GoBarber] Recuperação de Senha',
      template: {
        file: templateForgotPassword,
        variables: {
          name: user.name,
          link: `http://localhost:3000/reset_password?token=${token}`,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;
