import FakeUserRepository from '@modules/User/repositories/fakes/FakeUsersRepository';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';

import UpdateUserAvatarService from '@modules/User/services/UpdateUserAvatarService';

import AppError from '@shared/errors/AppError';

let fakeUserRepository: FakeUserRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateAvatar: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeStorageProvider = new FakeStorageProvider();

    updateAvatar = new UpdateUserAvatarService(
      fakeUserRepository,
      fakeStorageProvider,
    );
  });

  it('should update user avatar', async () => {
    const user = await fakeUserRepository.create({
      username: 'TestName',
      email: 'emailtest@gmail.com',
      password: 'testpass',
    });

    const saveFile = jest.spyOn(fakeStorageProvider, 'saveFile');

    const updatedUser = await updateAvatar.execute({
      user_id: user.id,
      avatarFilename: 'fakeAvatarFilename',
    });

    expect(updatedUser.avatar).toBe('fakeAvatarFilename');
    expect(saveFile).toHaveBeenCalledWith('fakeAvatarFilename');
  });

  it('should update when user already have an avatar', async () => {
    const user = await fakeUserRepository.create({
      username: 'TestName',
      email: 'emailtest@gmail.com',
      password: 'testpass',
    });

    await updateAvatar.execute({
      user_id: user.id,
      avatarFilename: 'fakeAvatarFilename',
    });

    const updatedUser = await updateAvatar.execute({
      user_id: user.id,
      avatarFilename: 'fakeNewAvatar',
    });

    expect(updatedUser.avatar).toBe('fakeNewAvatar');
  });

  it('should not update for a not-existing user', async () => {
    await expect(
      updateAvatar.execute({
        user_id: '123123',
        avatarFilename: 'fakeAvatarFilename',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
