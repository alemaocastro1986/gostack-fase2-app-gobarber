import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeRepository';

import ListProviderMounthAvailabilityService from './ListProviderMounthAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProvidersMouthAvailability: ListProviderMounthAvailabilityService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProvidersMouthAvailability = new ListProviderMounthAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('Should be able to list the month availability from provider', async () => {
    const appointments = [];
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < 10; index++) {
      appointments.push({
        provider_id: 'provider',
        user_id: 'user',
        date: new Date(2020, 4, 10, 8 + index, 0, 0),
      });
    }

    appointments.map(async appointment => {
      await fakeAppointmentsRepository.create(appointment);
    });

    await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 4, 11, 8, 0, 0),
    });

    await Promise.all(appointments);

    const availability = await listProvidersMouthAvailability.execute({
      provider_id: 'provider',
      month: 5,
      year: 2020,
    });

    expect(availability).toContainEqual({ day: 10, available: false });
    expect(availability).toContainEqual({ day: 11, available: true });
  });
});
