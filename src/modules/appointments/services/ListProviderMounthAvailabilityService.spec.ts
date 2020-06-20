// import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeRepository';
// import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';

import ListProviderMounthAvailabilityService from './ListProviderMounthAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
// let fakeUserRepository: FakeUserRepository;
let listProvidersMouthAvailability: ListProviderMounthAvailabilityService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    // fakeUserRepository = new FakeUserRepository();
    listProvidersMouthAvailability = new ListProviderMounthAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('Should be able to list the month availability from provider', async () => {
    const appointments = [];
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < 10; index++) {
      appointments.push({
        provider_id: 'user',
        date: new Date(2020, 4, 10, 8 + index, 0, 0),
      });
    }

    appointments.map(async appointment => {
      await fakeAppointmentsRepository.create(appointment);
    });

    await Promise.all(appointments);

    const availability = await listProvidersMouthAvailability.execute({
      provider_id: 'user',
      month: 5,
      year: 2020,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 9, available: true },
        { day: 10, available: false },
        { day: 11, available: false },
        { day: 12, available: true },
      ]),
    );
  });
});
