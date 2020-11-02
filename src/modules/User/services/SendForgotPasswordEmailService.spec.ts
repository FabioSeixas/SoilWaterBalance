import FakeUserRepository from '@modules/User/repositories/fakes/FakeUsersRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUserTokensRepository from '@modules/User/repositories/fakes/FakeUserTokensRepository';

import SendForgotPasswordEmailService from '@modules/User/services/SendForgotPasswordEmailService';

import AppError from '@shared/errors/AppError';

let fakeUserRepository: FakeUserRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUserRepository,
      fakeUserTokensRepository,
      fakeMailProvider,
    );
  });

  it('should send email', async () => {
    const user = await fakeUserRepository.create({
      username: 'TestName',
      email: 'emailtest@gmail.com',
      password: 'fakePassword',
    });

    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');
    const generate = jest.spyOn(fakeUserTokensRepository, 'generate');

    await sendForgotPasswordEmail.execute({
      email: user.email,
    });

    expect(sendMail).toHaveBeenCalled();
    expect(generate).toHaveBeenCalledWith(user.id);
  });

  it('should not send email to a non-existing user', async () => {
    await expect(
      sendForgotPasswordEmail.execute({
        email: 'fakeEmail@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
