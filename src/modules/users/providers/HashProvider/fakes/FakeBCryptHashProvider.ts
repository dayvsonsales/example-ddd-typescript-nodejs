import IHashProvider from '../IHashProvider';

export default class FakeBCryptHashProvider implements IHashProvider {
  async compare(a: string, b: string): Promise<boolean> {
    return a === b;
  }

  async generate(value: string): Promise<string> {
    return value;
  }
}
