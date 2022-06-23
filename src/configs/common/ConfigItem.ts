export default abstract class ConfigItem {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  constructor(..._: unknown[]) {}

  abstract equalsTo(item: ConfigItem): boolean;

  abstract toData(): Record<string, unknown>;

  static fromData(data: Record<string, unknown>): ConfigItem {
    console.error("Calling not implemented method fromData", data);
    throw new Error("Calling not implemented method fromData");
  }
}
