import FakeUserRepository from '@modules/User/repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '@modules/User/repositories/fakes/FakeUserTokensRepository';
import FakeHashProvider from '@modules/User/providers/HashProvider/fakes/FakeHashProvider';

import ResetPasswordService from '@modules/User/services/ResetPasswordService';

import AppError from '@shared/errors/AppError';

let fakeUserRepository: FakeUserRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeHashProvider: FakeHashProvider;
let resetPassword: ResetPasswordService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeHashProvider = new FakeHashProvider();

    resetPassword = new ResetPasswordService(
      fakeUserRepository,
      fakeUserTokensRepository,
      fakeHashProvider,
    );
  });

  it('should reset password', async () => {
    const user = await fakeUserRepository.create({
      username: 'TestName',
      email: 'emailtest@gmail.com',
      password: 'firstPassword',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    await resetPassword.execute({ password: 'secondPassword', token });

    expect(user.password).toBe('secondPassword');
  });

  it('should not reset password when user token do not exist', async () => {
    await expect(
      resetPassword.execute({ password: 'secondPassword', token: '12341234' }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not reset password when user do not exist', async () => {
    const { token } = await fakeUserTokensRepository.generate('123123');

    await expect(
      resetPassword.execute({ password: 'secondPassword', token }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not reset password after more than two hours later', async () => {
    const user = await fakeUserRepository.create({
      username: 'TestName',
      email: 'emailtest@gmail.com',
      password: 'firstPassword',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementation(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPassword.execute({ password: 'secondPassword', token }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
