import { inject, injectable } from 'tsyringe';

import IUsersRepository from '@modules/User/repositories/IUsersRepository';
import IUserTokensRepository from '@modules/User/repositories/IUserTokensRepository';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';

import AppError from '@shared/errors/AppError';

interface RequestDTO {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokenRepository')
    private userTokenRepository: IUserTokensRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({ email }: RequestDTO): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User email do not exists', 400);
    }

    await this.userTokenRepository.generate(user.id);

    await this.mailProvider.sendMail(email, '123123');
  }
}

export default SendForgotPasswordEmailService;
