import { uuid } from 'uuidv4';
import { getMonth, getYear, isEqual, getDate } from 'date-fns';
import IAppointmentRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllInMouthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMouthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO';

import Appointment from '../../infra/typeorm/entities/Appointment';

class AppointmentRepository implements IAppointmentRepository {
  private appointments: Appointment[] = [];

  public async findAllInMouthFromProvider({
    year,
    month,
    provider_id,
  }: IFindAllInMouthFromProviderDTO): Promise<Appointment[]> {
    const appointmentsAvailability = this.appointments.filter(
      appointment =>
        appointment.provider_id === provider_id &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year,
    );

    return appointmentsAvailability;
  }

  public async findAllInDayFromProvider({
    day,
    year,
    month,
    provider_id,
  }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
    const appointmentsAvailability = this.appointments.filter(
      appointment =>
        appointment.provider_id === provider_id &&
        getDate(appointment.date) === day &&
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year,
    );

    return appointmentsAvailability;
  }

  async create({
    provider_id,
    user_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();
    Object.assign(appointment, { id: uuid(), provider_id, date, user_id });

    this.appointments.push(appointment);
    return appointment;
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(appointment.date, date),
    );
    return findAppointment;
  }
}

export default AppointmentRepository;
