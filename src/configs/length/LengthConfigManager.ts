import ConfigManager from "../common/ConfigManager";
import LengthConfigItem from "./LengthConfigItem";

export default class LengthConfigManager extends ConfigManager {
  public static readonly key = "length";
  public static itemClass = LengthConfigItem;
  public static items: LengthConfigItem[] = [];
}
