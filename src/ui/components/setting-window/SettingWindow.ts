import ElementItem from "../ElementItem";
import style from "./setting-window.css";

export default class SettingWindow extends ElementItem {
  constructor() {
    super(document.createElement("div"));
    this.element.id = "baha-forum-filter-setting-window";
    ElementItem.addStyle(this.constructor.name, style);
  }
}
