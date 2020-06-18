import { startOfHour } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

interface IRequestDTO {
  date: Date;
  provider_id: string;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private _appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    date,
    provider_id,
  }: IRequestDTO): Promise<Appointment> {
    const appointmentDate = startOfHour(date);
    const findAppointmentInSameDate = await this._appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This scheduling time already busy!');
    }

    const appointment = await this._appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
