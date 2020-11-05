import FakeUserRepository from '@modules/User/repositories/fakes/FakeUsersRepository';

import ShowProfileService from '@modules/User/services/ShowProfileService';

import AppError from '@shared/errors/AppError';

let fakeUserRepository: FakeUserRepository;
let showProfile: ShowProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();

    showProfile = new ShowProfileService(fakeUserRepository);
  });

  it('should show user profile', async () => {
    const user = await fakeUserRepository.create({
      username: 'TestName',
      email: 'emailtest@gmail.com',
      password: 'testpass',
    });

    const userResult = await showProfile.execute(user.id);

    expect(user).toEqual(userResult);
  });

  it('should not show user for a non existing id', async () => {
    await expect(showProfile.execute('1231')).rejects.toBeInstanceOf(AppError);
  });
});
