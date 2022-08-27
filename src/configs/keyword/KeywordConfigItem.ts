import ConfigItem from "../common/ConfigItem";

export default class KeywordConfigItem extends ConfigItem {
  public constructor(
    public value: string,
    public full: boolean,
    public matches: Record<ContentType, boolean> = {
      post: true,
      comment: true,
    },
  ) {
    super();
  }

  public equalsTo(item: KeywordConfigItem): boolean {
    return item.value === this.value && item.full === this.full;
  }

  public getRegExp(): RegExp {
    if (this.full) {
      return new RegExp(`^${this.value}$`);
    }

    return new RegExp(this.value);
  }

  public getOriginalText(): string {
    return this.value.replace(/\\([.*+?^${}()|[\]\\])/g, "$1");
  }

  public toData(): Record<string, unknown> {
    const data = {
      value: this.value,
      full: this.full,
    };

    return data;
  }

  public static fromData(data: Record<string, unknown>): KeywordConfigItem {
    return new KeywordConfigItem(data.value as string, data.full as boolean);
  }
}
