import ConfigManager from "../common/ConfigManager";
import KeywordConfigItem from "./KeywordConfigItem";

export default class KeywordConfigManager extends ConfigManager {
  public static readonly key = "keywords";
  public static itemClass = KeywordConfigItem;
  public static items: KeywordConfigItem[] = [];
}
