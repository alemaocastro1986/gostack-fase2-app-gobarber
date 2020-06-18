import IMailProvider, { IMailContent } from '../models/IMailProvider';

export default class MailtrapProvider implements IMailProvider {
  public async sendMail(content: IMailContent): Promise<void> {}
}
