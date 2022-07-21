import ElementItem from "../ElementItem";
import TwoSideSwitch from "../TwoSideSwitch/TwoSideSwitch";
import style from "./feature-section.css";

export default class FeatureSection extends ElementItem {
  public constructor(
    public title: string,
    public description: string,
    public enabled: Record<ContentType, boolean>,
    public content: HTMLElement | null = null,
  ) {
    super(document.createElement("section"));
    this.element.classList.add("feature-section");

    const headerElement = document.createElement("header");

    const titleElement = document.createElement("h1");
    titleElement.textContent = title;
    headerElement.appendChild(titleElement);

    const descriptionElement = document.createElement("p");
    descriptionElement.textContent = description;
    headerElement.appendChild(descriptionElement);

    this.element.appendChild(headerElement);

    const contentElement = document.createElement("main");

    const switches = new TwoSideSwitch(enabled);
    contentElement.appendChild(switches.element);

    if (content) contentElement.appendChild(content);

    this.element.appendChild(contentElement);

    ElementItem.addStyle("FeatureSection", style);
  }
}
