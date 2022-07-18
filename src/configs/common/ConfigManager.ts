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
    this.items.push(item);
  }

  public static remove(item: ConfigItem): void {
    this.items.splice(this.items.indexOf(item), 1);
  }

  public static load(): ConfigItem[] {
    const raw = GM_getValue(this.key, {
      enabled: {
        post: true,
        comment: true,
      },
      data: [],
    });

    const listener = {
      originalObject: this,
      get(target: never, key: never): never {
        if (typeof target[key] === "object" && target[key] !== null) {
          return new Proxy(target[key], listener);
        } else {
          return target[key];
        }
      },
      set(target: never, prop: never, value: never): boolean {
        target[prop] = value;
        this.originalObject.save();
        return true;
      },
    };
    this.enabled = new Proxy(raw.enabled, listener);
    this.items = new Proxy(raw.data.map(this.itemClass.fromData), listener);

    return this.items;
  }

  public static save(): void {
    const data = {
      enabled: this.enabled,
      data: this.items.map(i => i.toData()),
    };
    console.log("saving data: ", data);
    GM_setValue(this.key, data);
  }

  public static clear(): void {
    this.items.splice(0, this.items.length);
  }
}
