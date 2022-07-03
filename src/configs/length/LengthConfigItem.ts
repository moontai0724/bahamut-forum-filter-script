import ConfigItem from "../common/ConfigItem";

export default class LengthConfigItem extends ConfigItem {
  constructor(public limit: number, public contentType: ContentType) {
    super();
  }

  equalsTo(item: LengthConfigItem): boolean {
    return item.limit === this.limit && item.contentType === this.contentType;
  }

  toData(): Record<string, unknown> {
    const data = {
      limit: this.limit,
      contentType: this.contentType,
    };

    return data;
  }

  static fromData(data: Record<string, unknown>): LengthConfigItem {
    return new LengthConfigItem(
      Number(data.limit),
      data.contentType as ContentType,
    );
  }
}
