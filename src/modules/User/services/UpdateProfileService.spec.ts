import FakeUserRepository from '@modules/User/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/User/providers/HashProvider/fakes/FakeHashProvider';

import UpdateProfileService from '@modules/User/services/UpdateProfileService';

import AppError from '@shared/errors/AppError';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });

  it('should update user email and username', async () => {
    const user = await fakeUserRepository.create({
      username: 'TestName',
      email: 'emailtest@gmail.com',
      password: 'testpass',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      email: 'newEmail@gmail.com',
      username: 'newUsername',
    });

    expect(updatedUser.email).toBe('newEmail@gmail.com');
    expect(updatedUser.username).toBe('newUsername');
  });

  it('should not update user with a non existing user id', async () => {
    await expect(
      updateProfile.execute({
        user_id: '123123',
        email: 'newEmail@gmail.com',
        username: 'newUsername',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should update user password', async () => {
    const user = await fakeUserRepository.create({
      username: 'TestName',
      email: 'emailtest@gmail.com',
      password: 'testpass',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      email: 'newEmail@gmail.com',
      username: 'newUsername',
      old_password: 'testpass',
      password: 'newPassword',
    });

    expect(updatedUser.password).toBe('newPassword');
  });

  it('should not update password if old password is not provided', async () => {
    const user = await fakeUserRepository.create({
      username: 'TestName',
      email: 'emailtest@gmail.com',
      password: 'testpass',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        email: 'newEmail@gmail.com',
        username: 'newUsername',
        password: 'newPassword',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not update password if old password is wrong', async () => {
    const user = await fakeUserRepository.create({
      username: 'TestName',
      email: 'emailtest@gmail.com',
      password: 'testpass',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        email: 'newEmail@gmail.com',
        username: 'newUsername',
        old_password: 'wrongPassword',
        password: 'newPassword',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
