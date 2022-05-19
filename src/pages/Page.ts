import Handler from "../handlers/Handler";

export default abstract class Page {
  public static device: DeviceType;
  public static pathname: PageType;

  public constructor(public handlers: Handler[]) {}

  public static isMatch(device: DeviceType, pathname: string): boolean {
    return this.device === device && this.pathname === pathname;
  }

  public execute(): void {
    console.info(
      `executing controller of page ${Page.pathname} at ${Page.device}`,
    );
    this.handlers.forEach(handler => handler.execute());
  }
}
