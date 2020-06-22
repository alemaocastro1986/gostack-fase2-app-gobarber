import AppError from '@shared/errors/AppError';
import FakeNotificationRepository from '@modules/notifications/infra/typeorm/repositories/fakes/FakeNotificationRepository';
import FakeAppointmentsRepository from '../repositories/fakes/FakeRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeNotificationRepository: FakeNotificationRepository;
let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;
describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeNotificationRepository = new FakeNotificationRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationRepository,
    );

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
  });
  it('Should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    const appointment = await createAppointment.execute({
      date: new Date(2020, 4, 10, 12),
      user_id: 'fake-user',
      provider_id: '123e4567-e89b-12d3-a456-426614174000',
    });

    expect(appointment).toHaveProperty('id');
  });

  it('Should not be able to create a two appointments on the same time', async () => {
    const appointmentDate = new Date(2020, 4, 10, 13, 0, 0);
    await createAppointment.execute({
      date: appointmentDate,
      user_id: 'fake-user',
      provider_id: '123e4567-e89b-12d3-a456-426614174000',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        user_id: 'fake-user',
        provider_id: '123e4567-e89b-12d3-a456-426614174000',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to create an appointment in past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 11),
        user_id: 'fake-user',
        provider_id: '123e4567-e89b-12d3-a456-426614174000',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to create an appointment with same user is provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 13),
        user_id: 'fake-user',
        provider_id: 'fake-user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to create an appointment with hour before 8hrs and after 17hrs', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 11, 7),
        user_id: 'fake-user',
        provider_id: 'provider',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
