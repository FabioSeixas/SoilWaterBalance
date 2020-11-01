import IHashProvider from '@modules/User/providers/models/IHashProvider';

export default class FakeHashProvider implements IHashProvider {
  public async createHash(payload: string): Promise<string> {
    return payload;
  }

  public async compareHash(
    payload: string,
    password: string,
  ): Promise<boolean> {
    return payload === password;
  }
}
