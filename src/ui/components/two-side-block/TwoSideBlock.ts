import ElementItem from "../ElementItem";
import style from "./two-side-block.css";

export default class TwoSideBlock extends ElementItem {
  public leftSideElement: HTMLElement;
  public rightSideElement: HTMLElement;

  public constructor() {
    super(document.createElement("div"));
    this.element.classList.add("two-side-block");

    this.leftSideElement = document.createElement("div");
    this.leftSideElement.classList.add("left-side");
    this.element.appendChild(this.leftSideElement);

    this.rightSideElement = document.createElement("div");
    this.rightSideElement.classList.add("right-side");
    this.element.appendChild(this.rightSideElement);

    ElementItem.addStyle("TwoSideBlock", style);
  }
}
