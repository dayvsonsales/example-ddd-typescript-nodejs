import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeBCryptHashProvider';
import BCryptHashProvider from '../providers/HashProvider/implementations/BCryptHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUserRepository';
import CreateUserService from './CreateUserService';

describe('Create User Service', () => {
  it('should be able to create a user', async () => {
    const usersRepository = new FakeUsersRepository();

    const createUserService = new CreateUserService(
      usersRepository,
      new FakeHashProvider(),
    );

    expect(
      await createUserService.execute({
        name: 'Dayvson Sales',
        email: 'dayvson@outlook.com',
        password: '123456',
      }),
    ).toHaveProperty('id');
  });

  it('should not be able to create a user that already exists', async () => {
    const usersRepository = new FakeUsersRepository();

    await usersRepository.create({
      name: 'Dayvson',
      email: 'dayvson@outlook.com',
      password: '123456',
    });

    const createUserService = new CreateUserService(
      usersRepository,
      new BCryptHashProvider(),
    );

    expect(
      createUserService.execute({
        name: 'Dayvson',
        email: 'dayvson@outlook.com',
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
