import ConfigItem from "../common/ConfigItem";

export default class LengthConfigItem extends ConfigItem {
  public constructor(public limit: number, public contentType: ContentType) {
    super();
  }

  public equalsTo(item: LengthConfigItem): boolean {
    return item.contentType === this.contentType;
  }

  public toData(): Record<string, unknown> {
    const data = {
      limit: this.limit,
      contentType: this.contentType,
    };

    return data;
  }

  public static fromData(data: Record<string, unknown>): LengthConfigItem {
    return new LengthConfigItem(
      Number(data.limit),
      data.contentType as ContentType,
    );
  }
}
