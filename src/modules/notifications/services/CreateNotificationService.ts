import { inject, injectable } from 'tsyringe';
import INotificationRepository from '../repositories/INotificationRepository';

import Notification from '../infra/typeorm/schemas/Notification';

interface IRequestDTO {
  content: string;
  recipient_id: string;
}

@injectable()
class CreateNotificationService {
  constructor(
    @inject('NotificationRepository')
    private _notificationRepository: INotificationRepository,
  ) {}

  public async execute({
    content,
    recipient_id,
  }: IRequestDTO): Promise<Notification> {
    const notification = await this._notificationRepository.create({
      content,
      recipient_id,
    });

    return notification;
  }
}

export default CreateNotificationService;
