export default interface IHashProvider {
  generate(value: string): Promise<string>;
  compare(a: string, b: string): Promise<boolean>;
}
