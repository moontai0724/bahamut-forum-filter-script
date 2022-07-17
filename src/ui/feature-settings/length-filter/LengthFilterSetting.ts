import LengthConfigManager from "../../../configs/length/LengthConfigManager";
import FeatureSection from "../../components/feature-section/FeatureSection";

export default class LengthFilterSetting extends FeatureSection {
  public constructor() {
    super(
      "長度過濾",
      "可以指定文章或留言的長度限制，當內容小於或等於限制長度時，就會被隱藏。",
      LengthConfigManager.enabled,
    );
  }
}
