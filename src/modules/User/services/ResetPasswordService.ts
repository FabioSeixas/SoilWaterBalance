import { inject, injectable } from 'tsyringe';
import { differenceInHours } from 'date-fns';

import IUsersRepository from '@modules/User/repositories/IUsersRepository';
import IUserTokensRepository from '@modules/User/repositories/IUserTokensRepository';
import AppError from '@shared/errors/AppError';
import IHashProvider from '@modules/User/providers/HashProvider/models/IHashProvider';

// import AppError from '@shared/errors/AppError';

interface RequestDTO {
  password: string;
  token: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokenRepository')
    private userTokenRepository: IUserTokensRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ password, token }: RequestDTO): Promise<void> {
    const userToken = await this.userTokenRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User Token do not exists', 400);
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User do not exists', 400);
    }

    if (differenceInHours(Date.now(), userToken.created_at) > 2) {
      throw new AppError('Token expired', 400);
    }

    user.password = await this.hashProvider.createHash(password);

    await this.usersRepository.save(user);
  }
}

export default ResetPasswordService;
