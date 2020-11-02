import { inject, injectable } from 'tsyringe';

import IUsersRepository from '@modules/User/repositories/IUsersRepository';

import IUserTokenRepository from '@modules/User/repositories/IUserTokensRepository';

// import AppError from '@shared/errors/AppError';

interface RequestDTO {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokenRepository')
    private userTokenRepository: IUserTokenRepository,
  ) {}

  public async execute({ email }: RequestDTO): Promise<void> {}
}

export default SendForgotPasswordEmailService;
