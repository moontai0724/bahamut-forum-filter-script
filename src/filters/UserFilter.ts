import Filter from "./Filter";

export default class UserFilter extends Filter {
  constructor(selector: string) {
    super(selector);
  }

  public test(element: Element): boolean {
    console.info("testing user at element: ", element);
    const target = element.querySelector(this.selector);
    throw new Error("not implemented");

    return false;
  }
}
