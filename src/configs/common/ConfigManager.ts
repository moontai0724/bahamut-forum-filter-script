import ConfigItem from "./ConfigItem";

export default class ConfigManager {
  public static readonly key: string;
  public static itemClass = ConfigItem;
  public static items: ConfigItem[] = [];
  public static enabled: Record<ContentType, boolean>;

  public static isExist(item: ConfigItem): boolean {
    const existing = this.items.find(i => i.equalsTo(item));
    return !!existing;
  }

  public static add(item: ConfigItem): void {
    if (this.isExist(item)) {
      console.info("item already exists: ", item);
      this.save();
      return;
    }

    this.items.push(item);
    this.save();
  }

  public static remove(item: ConfigItem): void {
    this.items.splice(this.items.indexOf(item), 1);
    this.save();
  }

  public static load(): ConfigItem[] {
    const raw = GM_getValue(this.key, {
      enabled: {
        post: true,
        comment: true,
      },
      data: [],
    });
    this.items = raw.data.map(this.itemClass.fromData);
    this.enabled = raw.enabled;

    return this.items;
  }

  public static save(): void {
    const data = {
      enabled: this.enabled,
      data: this.items.map(i => i.toData()),
    };
    GM_setValue(this.key, data);
  }

  public static clear(): void {
    this.items = [];
    this.save();
  }
}
