import { ObjectID } from 'mongodb';
import INotificationRepository from '@modules/notifications/repositories/INotificationRepository';
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';

import Notification from '../../schemas/Notification';

export default class NotificationRepository implements INotificationRepository {
  private notifications: Notification[] = [];

  public async create({
    content,
    recipient_id,
  }: ICreateNotificationDTO): Promise<Notification> {
    const notification = new Notification();

    Object.assign(notification, {
      id: new ObjectID(),
      content,
      recipient_id,
      read: false,
      created_at: new Date(Date.now()),
      updated_at: new Date(Date.now()),
    });

    this.notifications.push(notification);

    return notification;
  }
}
