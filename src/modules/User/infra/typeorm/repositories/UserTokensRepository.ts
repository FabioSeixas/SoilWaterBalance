import { Repository, getRepository } from 'typeorm';

import UserToken from '@modules/User/infra/typeorm/entities/UserToken';
import IUserTokensRepository from '@modules/User/repositories/IUserTokensRepository';

class UserTokensRepository implements IUserTokensRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.ormRepository.findOne({ where: { token } });
    return userToken;
  }

  public async generate(user_id: string): Promise<UserToken> {
    const newUserToken = this.ormRepository.create({ user_id });

    await this.ormRepository.save(newUserToken);

    return newUserToken;
  }
}

export default UserTokensRepository;
