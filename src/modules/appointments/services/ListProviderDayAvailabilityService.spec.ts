import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeRepository';

import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProvidersDayAvailability: ListProviderDayAvailabilityService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProvidersDayAvailability = new ListProviderDayAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('Should be able to list the month availability from provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 11, 0, 0).getTime();
    });

    const appointments = [];
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < 2; index++) {
      appointments.push({
        provider_id: 'user',
        date: new Date(2020, 4, 10, 14 + index, 0, 0),
      });
    }

    appointments.map(async appointment => {
      await fakeAppointmentsRepository.create(appointment);
    });

    await Promise.all(appointments);

    const availability = await listProvidersDayAvailability.execute({
      provider_id: 'user',
      day: 10,
      month: 5,
      year: 2020,
    });

    expect(availability).toContainEqual({ hour: 8, available: false });
    expect(availability).toContainEqual({ hour: 11, available: false });
    expect(availability).toContainEqual({ hour: 12, available: true });
    expect(availability).toContainEqual({ hour: 14, available: false });
  });
});
