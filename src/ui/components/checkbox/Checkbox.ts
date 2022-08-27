export default class Checkbox {
  public element: HTMLLabelElement;

  public constructor(
    name: string,
    label: string,
    checked: boolean,
    labelProps: { [key: string]: string } = {},
  ) {
    this.element = document.createElement("label");
    const input = document.createElement("input");
    this.element.appendChild(input);
    input.type = "checkbox";
    input.name = name;
    if (checked) input.setAttribute("checked", "checked");
    this.element.appendChild(document.createTextNode(label));
    Object.entries(labelProps).forEach(([key, value]) =>
      this.element.setAttribute(key, value),
    );
  }
}
