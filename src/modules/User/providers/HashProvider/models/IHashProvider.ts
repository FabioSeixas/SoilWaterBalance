export default interface IHashProvider {
  createHash(payload: string): Promise<string>;
  compareHash(payload: string, password: string): Promise<boolean>;
}
