import { injectable, inject } from 'tsyringe';

import User from '@modules/User/infra/typeorm/entities/User';

import IUsersRepository from '@modules/User/repositories/IUsersRepository';
import IHashProvider from '@modules/User/providers/HashProvider/models/IHashProvider';
import AppError from '@shared/errors/AppError';

interface RequestDTO {
  user_id: string;
  username: string;
  email: string;
  old_password?: string;
  password?: string;
}

@injectable()
export default class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    user_id,
    email,
    username,
    old_password,
    password,
  }: RequestDTO): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User do not exists', 400);
    }

    if (password && !old_password) {
      throw new AppError('Old password is necessary', 400);
    }

    if (password && old_password) {
      const matchPassword = await this.hashProvider.compareHash(
        old_password,
        user.password,
      );

      if (!matchPassword) {
        throw new AppError('Wrong old password', 400);
      }
      user.password = await this.hashProvider.createHash(password);
    }

    Object.assign(user, {
      email,
      username,
    });

    await this.usersRepository.save(user);

    return user;
  }
}
