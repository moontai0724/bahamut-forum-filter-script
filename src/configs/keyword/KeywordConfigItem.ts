import ConfigItem from "../common/ConfigItem";

export default class KeywordConfigItem extends ConfigItem {
  constructor(public value: string, public full: boolean) {
    super();
  }

  equalsTo(item: KeywordConfigItem): boolean {
    return item.value === this.value && item.full === this.full;
  }

  getRegExp(): RegExp {
    if (this.full) {
      return new RegExp(`^${this.value}$`);
    }

    return new RegExp(this.value);
  }

  toData(): Record<string, unknown> {
    const data = {
      value: this.value,
      full: this.full,
    };

    return data;
  }

  static fromData(data: Record<string, unknown>): KeywordConfigItem {
    return new KeywordConfigItem(data.value as string, data.full as boolean);
  }
}
