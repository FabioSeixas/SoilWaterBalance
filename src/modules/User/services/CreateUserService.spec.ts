import 'reflect-metadata';

import CreateUserService from '@modules/User/services/CreateUserService';
import FakeUserRepository from '@modules/User/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/User/providers/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';

describe('CreateUser', () => {
  it('should create a new user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    const newUserData = {
      username: 'TestName',
      email: 'emailtest@gmail.com',
      password: 'testpass',
    };

    const newUser = await createUser.execute(newUserData);

    expect(newUser).toHaveProperty('id');
  });

  it('should not create an user with an existing username', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    await createUser.execute({
      username: 'TestName',
      email: 'emailtest@gmail.com',
      password: 'testpass',
    });

    expect(
      createUser.execute({
        username: 'TestName',
        email: 'fakEmail@gmail.com',
        password: 'testpass',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not create an user with an existing email', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    await createUser.execute({
      username: 'TestName',
      email: 'emailtest@gmail.com',
      password: 'testpass',
    });

    expect(
      createUser.execute({
        username: 'FakeName',
        email: 'emailtest@gmail.com',
        password: 'testpass',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
