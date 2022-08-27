import KeywordConfigManager from "../../../configs/keyword/KeywordConfigManager";
import FeatureSection from "../../components/feature-section/FeatureSection";
import KeywordBlock from "../../components/keyword-block/KeywordBlock";

export default class KeywordFilterSetting extends FeatureSection {
  public constructor() {
    super(
      "關鍵字過濾",
      "關鍵字過濾可以指定要過濾的關鍵字，當文章或留言中包含這些關鍵字時，就會被隱藏。",
      KeywordConfigManager.enabled,
    );

    const keywordBlock = new KeywordBlock(KeywordConfigManager.items);
    this.contentElement.appendChild(keywordBlock.element);
  }
}
