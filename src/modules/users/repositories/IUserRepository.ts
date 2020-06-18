import User from '@modules/users/infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

export default interface IUserRepository {
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
  update(user: User): Promise<User>;
}
