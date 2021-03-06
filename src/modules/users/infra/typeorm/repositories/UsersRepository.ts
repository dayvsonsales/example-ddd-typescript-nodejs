import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { getRepository, Repository } from 'typeorm';
import User from '../entities/User';

export default class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);

    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { email } });

    return user;
  }

  async create(data: ICreateUserDTO): Promise<User> {
    const user = await this.ormRepository.create(data);

    await this.ormRepository.save(user);

    return user;
  }

  async save(user: User): Promise<User> {
    const data = await this.ormRepository.save(user);

    return data;
  }
}
