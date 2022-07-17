import ElementItem from "../ElementItem";
import Switch from "../switch/Switch";
import TwoSideBlock from "../two-side-block/TwoSideBlock";
import style from "./two-side-switch.css";

export default class TwoSideSwitch extends TwoSideBlock {
  public constructor(public enabled: Record<ContentType, boolean>) {
    super();
    this.element.classList.add("two-side-switch");

    const postSwitchText = document.createElement("span");
    postSwitchText.textContent = "文章過濾";
    this.leftSideElement.appendChild(postSwitchText);
    const postSwitcher = new Switch(enabled.post, event => {
      this.enabled.post = (event.target as HTMLInputElement).checked;
    });
    this.leftSideElement.appendChild(postSwitcher.element);

    const commentSwitchText = document.createElement("span");
    commentSwitchText.textContent = "留言過濾";
    this.rightSideElement.appendChild(commentSwitchText);
    const commentSwitcher = new Switch(enabled.comment, event => {
      this.enabled.comment = (event.target as HTMLInputElement).checked;
    });
    this.rightSideElement.appendChild(commentSwitcher.element);

    ElementItem.addStyle("TwoSideSwitch", style);
  }
}
