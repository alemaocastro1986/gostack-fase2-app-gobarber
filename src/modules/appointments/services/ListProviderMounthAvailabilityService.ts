import { inject, injectable } from 'tsyringe';

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

    console.log(appointmentsAvailability);

    return [{ day: 1, available: false }];
  }
}
