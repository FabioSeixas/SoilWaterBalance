import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import IUsersRepository from '@modules/User/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import User from '@modules/User/infra/typeorm/entities/User';
import authConfig from '@config/auth';
import IHashProvider from '@modules/User/providers/HashProvider/models/IHashProvider';

interface RequestDTO {
  email: string;
  password: string;
}

interface AuthResponse {
  user: User;
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ email, password }: RequestDTO): Promise<AuthResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password.', 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password.', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return { user, token };
  }
}

export default AuthenticateUserService;
