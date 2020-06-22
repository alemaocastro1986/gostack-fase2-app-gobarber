import { getMongoRepository, MongoRepository } from 'typeorm';

import INotificationRepository from '@modules/notifications/repositories/INotificationRepository';
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';

import Notification from '../schemas/Notification';

class NotificationRepository implements INotificationRepository {
  private _ormRepository: MongoRepository<Notification>;

  constructor() {
    this._ormRepository = getMongoRepository(Notification, 'mongo');
  }

  public async create({
    content,
    recipient_id,
  }: ICreateNotificationDTO): Promise<Notification> {
    const notification = this._ormRepository.create({
      content,
      recipient_id,
    });

    await this._ormRepository.save(notification);
    return notification;
  }
}

export default NotificationRepository;
