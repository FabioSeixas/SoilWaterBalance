import { v4 } from 'uuid';

import IUsersRepository from '@modules/User/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/User/dtos/ICreateUserDTO';
import User from '@modules/User/infra/typeorm/entities/User';

export default class FakeUsersRepository implements IUsersRepository {
  private repository: User[] = [];

  public async create(object: ICreateUserDTO): Promise<User> {
    const newUser = new User();

    Object.assign(newUser, object, { id: v4() });

    this.repository.push(newUser);

    return newUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.repository.find(item => item.email === email);

    return user;
  }

  public async findByName(username: string): Promise<User | undefined> {
    const user = this.repository.find(item => item.username === username);

    return user;
  }
}
