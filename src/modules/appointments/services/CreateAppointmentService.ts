import { startOfHour, isBefore, format } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import INotificationRepository from '@modules/notifications/repositories/INotificationRepository';

interface IRequestDTO {
  date: Date;
  provider_id: string;
  user_id: string;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private _appointmentsRepository: IAppointmentsRepository,

    @inject('NotificationRepository')
    private _notificationRepository: INotificationRepository,
  ) {}

  public async execute({
    date,
    provider_id,
    user_id,
  }: IRequestDTO): Promise<Appointment> {
    const currentDate = Date.now();
    const appointmentDate = startOfHour(date);

    if (isBefore(appointmentDate, currentDate)) {
      throw new AppError("You can't create an appointment on a past date");
    }

    if (user_id === provider_id) {
      throw new AppError("You can't create an appointment with yourself ");
    }

    const appointmentDateHour = appointmentDate.getHours();
    if (appointmentDateHour < 8 || appointmentDateHour > 17) {
      throw new AppError('You requested an appointment at an invalid time.');
    }

    const findAppointmentInSameDate = await this._appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This scheduling time already busy!');
    }

    const appointment = await this._appointmentsRepository.create({
      provider_id,
      user_id,
      date: appointmentDate,
    });

    const formatDate = format(appointment.date, "dd/MM/yyyy 'às' HH:mm'h'");

    await this._notificationRepository.create({
      recipient_id: appointment.provider_id,
      content: `Novo agendamento para dia ${formatDate}`,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
