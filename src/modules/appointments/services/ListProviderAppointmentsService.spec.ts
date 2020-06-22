import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeRepository';

import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderAppointmentsService: ListProviderAppointmentsService;

describe('ListAppointmentsProvider', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderAppointmentsService = new ListProviderAppointmentsService(
      fakeAppointmentsRepository,
    );
  });

  it('Should be able to list the appointments from provider on as specific day', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 11, 0, 0).getTime();
    });

    const appointment1 = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 4, 10, 14, 0, 0),
    });

    const appointment2 = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 4, 10, 15, 0, 0),
    });

    const listAppointments = await listProviderAppointmentsService.execute({
      provider_id: 'provider',
      day: 10,
      month: 5,
      year: 2020,
    });

    expect(listAppointments).toContainEqual(appointment1);
    expect(listAppointments).toContainEqual(appointment2);
  });
});
