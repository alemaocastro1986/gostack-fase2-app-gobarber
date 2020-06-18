import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

// DTOs
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';

export default interface IAppointmentRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
}
