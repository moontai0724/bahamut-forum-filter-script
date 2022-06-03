export default class ElementItem {
  public static styles: Record<string, string> = {};

  constructor(public element: HTMLElement) {}

  public static addStyle(name: string, content: string) {
    if (this.styles[name]) return;
    this.styles[name] = content;
  }
}
