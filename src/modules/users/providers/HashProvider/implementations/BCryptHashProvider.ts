import bcrypt from 'bcryptjs';
import IHashProvider from '../IHashProvider';

export default class BCryptHashProvider implements IHashProvider {
  async generate(value: string): Promise<string> {
    const hashedValue = await bcrypt.hash(value, 8);

    return hashedValue;
  }

  async compare(a: string, b: string): Promise<boolean> {
    const isValid = await bcrypt.compare(a, b);

    return isValid;
  }
}
