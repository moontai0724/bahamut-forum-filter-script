import LengthConfigItem from "../../../configs/length/LengthConfigItem";
import LengthConfigManager from "../../../configs/length/LengthConfigManager";
import ElementItem from "../../components/ElementItem";
import FeatureSection from "../../components/feature-section/FeatureSection";
import Input from "../../components/input/Input";
import TwoSideBlock from "../../components/two-side-block/TwoSideBlock";
import style from "./length-filter-setting.css";

export default class LengthFilterSetting extends FeatureSection {
  public constructor() {
    const twoSideBlock = new TwoSideBlock();

    let postLengthLimit = LengthConfigManager.items.find(
      v => v.contentType === "post",
    );
    if (!postLengthLimit) {
      postLengthLimit = new LengthConfigItem(0, "post");
      LengthConfigManager.add(postLengthLimit);
    }
    const leftInput = new Input(
      "number",
      postLengthLimit.limit.toString(),
      {
        placeholder: "文章長度限制",
        min: "0",
      },
      "文章長度限制",
      event => {
        const value = Number((event.target as HTMLInputElement).value);
        (postLengthLimit as LengthConfigItem).limit = value;
      },
    );
    twoSideBlock.leftSideElement.appendChild(leftInput.element);

    let commentLengthLimit = LengthConfigManager.items.find(
      v => v.contentType === "comment",
    );
    if (!commentLengthLimit) {
      commentLengthLimit = new LengthConfigItem(0, "comment");
      LengthConfigManager.add(commentLengthLimit);
    }
    const rightInput = new Input(
      "number",
      commentLengthLimit.limit.toString(),
      {
        placeholder: "留言長度限制",
        min: "0",
      },
      "留言長度限制",
      event => {
        const value = Number((event.target as HTMLInputElement).value);
        (commentLengthLimit as LengthConfigItem).limit = value;
      },
    );
    twoSideBlock.rightSideElement.appendChild(rightInput.element);
    twoSideBlock.element.classList.add("input-area");

    super(
      "長度過濾",
      "可以指定長度限制，當內容長度 ≦ 限制長度時，就會被隱藏。",
      LengthConfigManager.enabled,
      twoSideBlock.element,
    );

    this.element.classList.add("length-filter-setting");
    ElementItem.addStyle("LengthFilterSetting", style);
  }
}
