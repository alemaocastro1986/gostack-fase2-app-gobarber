import { hash, compare } from 'bcryptjs';
import IHashProvider from '../models/IHashProvider';

export default class BcryptHashProvider implements IHashProvider {
  public async generateHash(payload: string): Promise<string> {
    return hash(payload, 8);
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    const isMatched = await compare(payload, hashed);
    return isMatched;
  }
}
