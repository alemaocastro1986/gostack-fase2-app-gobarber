import { inject, injectable } from 'tsyringe';
import { getDaysInMonth, getDate } from 'date-fns';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

interface IRequestDTO {
  provider_id: string;
  month: number;
  year: number;
}

type IResponseDTO = Array<{
  day: number;
  available: boolean;
}>;

@injectable()
export default class ListProviderMounthAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private _appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    month,
    year,
  }: IRequestDTO): Promise<IResponseDTO> {
    const appointmentsAvailability = await this._appointmentsRepository.findAllInMouthFromProvider(
      {
        provider_id,
        month,
        year,
      },
    );

    const daysInMonth = getDaysInMonth(new Date(year, month - 1));

    const eachDayArray = Array.from(
      { length: daysInMonth },
      (value, index) => index + 1,
    );

    const availability = eachDayArray.map(day => {
      const isAvailableDay = appointmentsAvailability.filter(
        appointment => getDate(appointment.date) === day,
      ).length;
      return {
        day,
        available: isAvailableDay < 10,
      };
    });

    return availability;
  }
}
