import { uuid } from 'uuidv4';
import IUsersRepository from '@modules/users/repositories/IUserRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import User from '@modules/users/infra/typeorm/entities/User';

class UsersRepository implements IUsersRepository {
  private users: User[] = [];

  async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.email === email);
    return findUser;
  }

  async findById(id: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.id === id);

    return findUser;
  }

  async create({ name, email, password }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, {
      id: uuid(),
      name,
      email,
      password,
    });

    await this.users.push(user);

    return user;
  }

  async update(user: User): Promise<User> {
    const findIndex = this.users.findIndex(u => u.id === user.id);
    this.users[findIndex] = user;

    return user;
  }
}

export default UsersRepository;
