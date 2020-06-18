import IMailProvider, { IMailContent } from '../models/IMailProvider';

interface IMail {
  to: string;
  body: string;
}

export default class FakeMailProvider implements IMailProvider {
  private mails: IMail[] = [];

  public async sendMail(content: IMailContent): Promise<void> {
    this.mails.push(content);
  }
}
