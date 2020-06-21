import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;
describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });
  it('Should be able to create a new appointment', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(),
      user_id: 'fake-user',
      provider_id: '123e4567-e89b-12d3-a456-426614174000',
    });

    expect(appointment).toHaveProperty('id');
  });

  it('Should not be able to create a two appointments on the same time', async () => {
    const appointmentDate = new Date();

    await createAppointment.execute({
      date: appointmentDate,
      user_id: 'fake-user',

      provider_id: '123e4567-e89b-12d3-a456-426614174000',
    });

    expect(
      createAppointment.execute({
        date: appointmentDate,
        user_id: 'fake-user',
        provider_id: '123e4567-e89b-12d3-a456-426614174000',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
