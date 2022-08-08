import ElementItem from "../ElementItem";

export default class InputWithLabel extends ElementItem {
  public constructor(
    props: { type: string; [key: string]: string },
    content: string,
    listener: EventListenerOrEventListenerObject | null = null,
  ) {
    super(document.createElement("label"));

    this.element.innerHTML = content;

    const input = document.createElement("input");
    if (listener) input.addEventListener("change", listener);
    Object.entries(props).forEach(([key, value]) =>
      input.setAttribute(key, value),
    );

    this.element.appendChild(input);
  }
}
