import ElementItem from "../ElementItem";

export default class Input extends ElementItem {
  public constructor(
    type: string,
    value: string,
    props: Record<string, string>,
    content: string,
    listener: EventListenerOrEventListenerObject,
  ) {
    super(document.createElement("label"));

    this.element.innerHTML = content;

    const input = document.createElement("input");
    input.type = type;
    input.value = value;
    input.addEventListener("change", listener);
    Object.entries(props).forEach(([key, value]) =>
      input.setAttribute(key, value),
    );

    this.element.appendChild(input);
  }
}
