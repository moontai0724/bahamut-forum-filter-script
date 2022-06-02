import Handler from "../handlers/Handler";

export default abstract class Page {
  public static device: DeviceType;
  public static pathname: PageType;

  public constructor(public handlers: Handler[]) {}

  public static isMatch(device: DeviceType, pathname: string): boolean {
    console.info(
      `checking device ${device}(${this.device}), pathname ${pathname}(${this.pathname}).`,
    );
    return this.device === device && this.pathname === pathname;
  }

  public execute(): void {
    console.info(`executing PageController: ${this.constructor.name}`);
    this.handlers.forEach(handler => handler.execute());
  }
}
