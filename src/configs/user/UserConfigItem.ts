import ConfigItem from "../common/ConfigItem";

export default class UserConfigItem extends ConfigItem {
  public constructor(
    public account: string = "",
    public type: DisplayPolicy = "deny",
  ) {
    super();
  }

  public equalsTo(item: UserConfigItem): boolean {
    const result = this.account === item.account && this.type === item.type;
    console.log("comparing user: ", this, " with ", item, " result ", result);
    return result;
  }

  public toData(): Record<string, unknown> {
    return {
      account: this.account,
      type: this.type,
    };
  }

  public static fromData(data: Record<string, unknown>): UserConfigItem {
    return new UserConfigItem(
      data.account as string,
      data.type as DisplayPolicy,
    );
  }
}
