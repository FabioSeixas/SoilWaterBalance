import 'reflect-metadata';

import CreateUserService from '@modules/User/services/CreateUserService';
import FakeUserRepository from '@modules/User/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/User/providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(fakeUserRepository, fakeHashProvider);
  });

  it('should create a new user', async () => {
    const newUserData = {
      username: 'TestName',
      email: 'emailtest@gmail.com',
      password: 'testpass',
    };

    const newUser = await createUser.execute(newUserData);

    expect(newUser).toHaveProperty('id');
  });

  it('should not create an user with an existing username', async () => {
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
