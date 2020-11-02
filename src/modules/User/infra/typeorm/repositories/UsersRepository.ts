import { Repository, getRepository } from 'typeorm';

import User from '@modules/User/infra/typeorm/entities/User';
import IUsersRepository from '@modules/User/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/User/dtos/ICreateUserDTO';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { email } });
    return user;
  }

  public async findByName(username: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { username } });
    return user;
  }

  public async findById(user_id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { id: user_id } });
    return user;
  }

  public async create({
    email,
    username,
    password,
  }: ICreateUserDTO): Promise<User> {
    const newUser = this.ormRepository.create({ email, password, username });

    await this.ormRepository.save(newUser);

    return newUser;
  }

  public async save(user: User): Promise<User> {
    await this.ormRepository.save(user);

    return user;
  }
}

export default UsersRepository;
