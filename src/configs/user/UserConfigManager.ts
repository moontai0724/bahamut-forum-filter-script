import ConfigManager from "../common/ConfigManager";
import UserConfigItem from "./UserConfigItem";

export default class UserConfigManager extends ConfigManager {
  public static readonly key = "users";
  public static itemClass = UserConfigItem;
  public static items: UserConfigItem[] = [];
}
