import { v4 } from 'uuid';

import UserToken from '@modules/User/infra/typeorm/entities/UserToken';

import IUserTokensRepository from '@modules/User/repositories/IUserTokensRepository';

export default class FakeUserTokensRepository implements IUserTokensRepository {
  private userTokens: UserToken[] = [];

  public async generate(user_id: string): Promise<UserToken> {
    const newUserToken = new UserToken();

    Object.assign(newUserToken, {
      id: v4(),
      token: v4(),
      user_id,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.userTokens.push(newUserToken);

    return newUserToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = this.userTokens.find(item => item.token === token);

    return userToken;
  }
}
