import { injectable, inject } from 'tsyringe';

import User from '@modules/User/infra/typeorm/entities/User';

import IUsersRepository from '@modules/User/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';

@injectable()
export default class ShowProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(user_id: string): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User do not exists', 400);
    }

    return user;
  }
}
