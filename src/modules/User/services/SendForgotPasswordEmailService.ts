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

    @inject('UserTokensRepository')
    private userTokenRepository: IUserTokensRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({ email }: RequestDTO): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User email do not exists', 400);
    }

    const { token } = await this.userTokenRepository.generate(user.id);

    await this.mailProvider.sendMail({
      to: {
        name: user.username,
        email: user.email,
      },
      subject: 'Password Recover',
      templateData: {
        template:
          'Olá {{name}}, recebemos seu pedido de recuperação de senha. Aqui está seu token para alterar sua senha: {{token}}',
        variables: {
          name: user.username,
          token,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;
