import ISendMailDTO from '@providers/MailProvider/dtos/ISendMailDTO';
import IMailProvider from '../models/IMailProvider';

interface IMail {
  to: string;
  body: string;
}

export default class FakeMailProvider implements IMailProvider {
  private mails: ISendMailDTO[] = [];

  public async sendMail(message: ISendMailDTO): Promise<void> {
    this.mails.push(message);
  }
}
