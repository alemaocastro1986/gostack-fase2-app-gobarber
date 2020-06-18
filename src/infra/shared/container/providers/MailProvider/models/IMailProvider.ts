export interface IMailContent {
  to: string;
  body: string;
}

export default interface IMailProvider {
  sendMail(content: IMailContent): Promise<void>;
}
