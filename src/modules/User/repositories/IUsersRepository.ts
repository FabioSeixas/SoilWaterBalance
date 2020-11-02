import ICreateUserDTO from '@modules/User/dtos/ICreateUserDTO';

import User from '@modules/User/infra/typeorm/entities/User';

export default interface IUserRepository {
  findByEmail(email: string): Promise<User | undefined>;
  findByName(username: string): Promise<User | undefined>;
  findById(user_id: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}
