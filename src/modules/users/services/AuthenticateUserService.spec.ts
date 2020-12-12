import AppError from '@shared/errors/AppError';
import FakeBCryptHashProvider from '@modules/users/providers/HashProvider/fakes/FakeBCryptHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUserRepository';
import AuthenticateUserService from './AuthenticateUserService';

describe('Authenticate User Service', () => {
  it('should be able to authenticate a registered user', async () => {
    const usersRepository = new FakeUsersRepository();

    await usersRepository.create({
      name: 'Dayvson',
      email: 'dayvson@outlook.com',
      password: '123456',
    });

    const authenticateUserService = new AuthenticateUserService(
      usersRepository,
      new FakeBCryptHashProvider(),
    );

    expect(
      await authenticateUserService.execute({
        email: 'dayvson@outlook.com',
        password: '123456',
      }),
    ).toHaveProperty('token');
  });

  it('should not be able to authenticate a not registered user', async () => {
    const usersRepository = new FakeUsersRepository();

    const authenticateUserService = new AuthenticateUserService(
      usersRepository,
      new FakeBCryptHashProvider(),
    );

    expect(
      authenticateUserService.execute({
        email: 'dayvson@outlook.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password/email combination', async () => {
    const usersRepository = new FakeUsersRepository();

    await usersRepository.create({
      name: 'Dayvson',
      email: 'dayvson@outlook.com',
      password: '123456',
    });

    const authenticateUserService = new AuthenticateUserService(
      usersRepository,
      new FakeBCryptHashProvider(),
    );

    expect(
      authenticateUserService.execute({
        email: 'dayvson@outlook.com',
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
