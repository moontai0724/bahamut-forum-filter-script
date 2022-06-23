import KeywordConfigItem from "../configs/keyword/KeywordConfigItem";
import KeywordConfigManager from "../configs/keyword/KeywordConfigManager";
import Filter from "./Filter";

export default class KeywordFilter extends Filter {
  constructor(selector: string) {
    super(selector);
  }

  public test(element: Element): boolean {
    console.info("testing keyword at element: ", element, this.selector);
    const target = element.querySelector(this.selector);

    if (!target) {
      console.error(
        "KeywordFilter: target element not found",
        element,
        this.selector,
        target,
      );
      return true;
    }

    const conditions = KeywordConfigManager.load() as KeywordConfigItem[];

    for (const condition of conditions) {
      const regExp = condition.getRegExp();
      if (regExp.test(target.textContent ?? "")) {
        console.info(
          "KeywordFilter: matched keyword: ",
          condition,
          ", hiding element: ",
          element,
        );

        return false;
      }
    }

    return true;
  }
}
