import { inject, injectable } from 'tsyringe';
import { getHours, isAfter } from 'date-fns';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

interface IRequestDTO {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

type IResponseDTO = Array<{
  hour: number;
  available: boolean;
}>;

@injectable()
export default class ListProviderDayAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private _appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    day,
    month,
    year,
  }: IRequestDTO): Promise<IResponseDTO> {
    const appointmentsDay = await this._appointmentsRepository.findAllInDayFromProvider(
      {
        provider_id,
        day,
        month,
        year,
      },
    );

    const hourStart = 8;
    // quando vier do app tem que add +1
    const hourEnd = 17;
    const currentDate = new Date(Date.now());
    const availabilityHours = Array.from(
      { length: hourEnd + 1 - hourStart },
      (value, index) => index + 8,
    );

    const availability = availabilityHours.map(hour => {
      const hasAppointmentInHour = appointmentsDay.some(
        appointment => getHours(appointment.date) === hour,
      );

      const compareDate = new Date(year, month - 1, day, hour);
      return {
        hour,
        available: !hasAppointmentInHour && isAfter(compareDate, currentDate),
      };
    });

    return availability;
  }
}
