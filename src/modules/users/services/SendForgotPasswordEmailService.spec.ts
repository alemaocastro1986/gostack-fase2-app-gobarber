import AppError from '@shared/errors/AppError';

import FakeMailProvider from '@providers/MailProvider/fakes/FakeMailProvider';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

let fakeMailProvider: FakeMailProvider;
let fakeUserRepository: FakeUserRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendUserService', () => {
  beforeEach(() => {
    fakeMailProvider = new FakeMailProvider();
    fakeUserRepository = new FakeUserRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUserRepository,
      fakeMailProvider,
      fakeUserTokensRepository,
    );
  });

  it('Should be able to recovery the password using the email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUserRepository.create({
      name: 'john Doe',
      email: 'john_doe@gobarber.com.br',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'john_doe@gobarber.com.br',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('Should not  be able to recovery a non-existing user email', async () => {
    await expect(
      sendForgotPasswordEmail.execute({ email: 'john-doe@teste.com' }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should generate a forgot password token', async () => {
    const generate = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await fakeUserRepository.create({
      name: 'John Doe',
      email: 'johndoe@teste.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({ email: 'johndoe@teste.com' });

    expect(generate).toHaveBeenCalledWith(user.id);
  });
});
