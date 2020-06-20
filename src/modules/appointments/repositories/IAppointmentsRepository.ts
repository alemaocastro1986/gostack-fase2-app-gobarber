import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IFindAllInMouthFromProviderDTO from '../dtos/IFindAllInMouthFromProviderDTO';

// DTOs
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';

export default interface IAppointmentRepository {
  findAllInMouthFromProvider(
    data: IFindAllInMouthFromProviderDTO,
  ): Promise<Appointment[]>;
  findByDate(date: Date): Promise<Appointment | undefined>;
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
}
