import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUserRepository';

import UpdateUserAvatarService from './UpdateUserAvatarService';

describe('Update User Avatar Service', () => {
  it("should be able to change the user avatar if he doesn't have one", async () => {
    const usersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserAvatarService = new UpdateUserAvatarService(
      usersRepository,
      fakeStorageProvider,
    );

    const user = await usersRepository.create({
      name: 'Dayvson',
      email: 'dayvson@outlook.com',
      password: '123456',
    });

    const updatedUser = await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFilename: 'user_photo.jpg',
    });

    expect(updatedUser).toHaveProperty('avatar');
  });

  it('should not be able to change the avatar of an authenticated user', async () => {
    const usersRepository = new FakeUsersRepository();
    const updateUserAvatarService = new UpdateUserAvatarService(
      usersRepository,
      new FakeStorageProvider(),
    );
    expect(
      updateUserAvatarService.execute({
        user_id: '2',
        avatarFilename: 'user_photo.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete the old avatar before inserting a new one', async () => {
    const usersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserAvatarService = new UpdateUserAvatarService(
      usersRepository,
      fakeStorageProvider,
    );

    const spyFake = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const user = await usersRepository.create({
      name: 'Dayvson',
      email: 'dayvson@outlook.com',
      password: '123456',
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFilename: 'user_photo.jpg',
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFilename: 'user_photo2.jpg',
    });

    expect(spyFake).toHaveBeenCalledWith('user_photo.jpg');
  });
});
