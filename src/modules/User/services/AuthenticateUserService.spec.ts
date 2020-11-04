import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import AuthenticateUserService from '@modules/User/services/AuthenticateUserService';
import FakeUserRepository from '@modules/User/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/User/providers/HashProvider/fakes/FakeHashProvider';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();

    authenticateUser = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });

  it('should authenticate an user', async () => {
    const newUserData = {
      username: 'TestName',
      email: 'emailtest@gmail.com',
      password: 'testpass',
    };

    await fakeUserRepository.create(newUserData);

    const authenticatedUser = await authenticateUser.execute({
      email: newUserData.email,
      password: newUserData.password,
    });

    expect(authenticatedUser).toHaveProperty('token');
  });

  it('should not be able to authenticate with an wrong email', async () => {
    const newUserData = {
      username: 'TestName',
      email: 'emailtest@gmail.com',
      password: 'testpass',
    };

    await fakeUserRepository.create(newUserData);

    expect(
      authenticateUser.execute({
        email: 'fakeEmail@gmail.com',
        password: newUserData.password,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with an wrong password', async () => {
    const newUserData = {
      username: 'TestName',
      email: 'emailtest@gmail.com',
      password: 'testpass',
    };

    await fakeUserRepository.create(newUserData);

    expect(
      authenticateUser.execute({
        email: newUserData.email,
        password: 'wrongPassword',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
