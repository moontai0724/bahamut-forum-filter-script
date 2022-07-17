import ElementItem from "../ElementItem";
import style from "./switch.css";

export default class Switch extends ElementItem {
  public constructor(
    enabled: boolean,
    listener: EventListenerOrEventListenerObject,
  ) {
    super(document.createElement("label"));
    this.element.classList.add("switch");

    const input = document.createElement("input");
    input.type = "checkbox";
    input.checked = enabled;
    input.setAttribute("hidden", "true");
    input.addEventListener("change", listener);
    this.element.appendChild(input);

    const text = document.createElement("span");
    text.setAttribute("on", "開");
    text.setAttribute("off", "關");
    this.element.appendChild(text);

    const icon = document.createElement("i");
    this.element.appendChild(icon);

    ElementItem.addStyle("Switch", style);
  }
}
