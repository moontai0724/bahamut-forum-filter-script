import UserConfigManager from "../../../configs/user/UserConfigManager";
import FeatureSection from "../../components/feature-section/FeatureSection";

export default class UserFilterSetting extends FeatureSection {
  public constructor() {
    super(
      "使用者過濾",
      "使用者過濾可以指定要過濾的使用者，當文章或留言作者為指定的使用者時，就會被隱藏。",
      UserConfigManager.enabled,
    );
  }
}
