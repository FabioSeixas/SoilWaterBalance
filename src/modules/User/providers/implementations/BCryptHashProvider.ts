import { hash, compare } from 'bcryptjs';

import IHashProvider from '@modules/User/providers/models/IHashProvider';

export default class BCryptHashProvider implements IHashProvider {
  public async createHash(payload: string): Promise<string> {
    return hash(payload, 8);
  }

  public async compareHash(
    payload: string,
    password: string,
  ): Promise<boolean> {
    return compare(payload, password);
  }
}
