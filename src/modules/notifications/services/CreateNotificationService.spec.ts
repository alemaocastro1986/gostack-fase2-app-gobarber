import CreateNotificationService from './CreateNotificationService';
import FakeNotificationRepository from '../infra/typeorm/repositories/fakes/FakeNotificationRepository';

let fakeNotificationRepository: FakeNotificationRepository;
let createNotification: CreateNotificationService;
describe('CreateNotification', () => {
  beforeEach(() => {
    fakeNotificationRepository = new FakeNotificationRepository();
    createNotification = new CreateNotificationService(
      fakeNotificationRepository,
    );
  });
  it('Should be able Create a new Notification', async () => {
    const fakeNotification = {
      content: 'Hello Teste',
      recipient_id: 'client',
    };

    const notification = await createNotification.execute(fakeNotification);

    expect(notification).toHaveProperty('content');
    expect(notification).toHaveProperty('recipient_id');
    expect(notification.content).toBe(fakeNotification.content);
    expect(notification.recipient_id).toBe(fakeNotification.recipient_id);
  });
});
