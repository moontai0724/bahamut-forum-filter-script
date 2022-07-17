import ElementItem from "../components/ElementItem";
import KeywordFilterSetting from "../feature-settings/keyword-filter/KeywordFilterSetting";
import LengthFilterSetting from "../feature-settings/length-filter/LengthFilterSetting";
import UserFilterSetting from "../feature-settings/user-filter/UserFilterSetting";
import style from "./setting-window.css";

export default class SettingWindow extends ElementItem {
  public constructor() {
    super(document.createElement("div"));
    this.element.id = "baha-forum-filter-setting-window";

    const lengthSection = new LengthFilterSetting();
    this.element.appendChild(lengthSection.element);

    const keywordSection = new KeywordFilterSetting();
    this.element.appendChild(keywordSection.element);

    const userSection = new UserFilterSetting();
    this.element.appendChild(userSection.element);

    ElementItem.addStyle("SettingWindow", style);
  }
}
