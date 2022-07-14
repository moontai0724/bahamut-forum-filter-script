import KeywordConfigManager from "../configs/keyword/KeywordConfigManager";
import Filter from "./Filter";

export default class KeywordFilter extends Filter {
  public constructor(selector: string, contentType: ContentType) {
    super(selector, contentType);
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

    KeywordConfigManager.load();

    if (!KeywordConfigManager.enabled[this.contentType]) {
      console.info(
        "KeywordFilter: keyword filter disabled for content type: ",
        this.contentType,
      );
      return true;
    }

    for (const condition of KeywordConfigManager.items) {
      if (!condition.matches[this.contentType]) continue;

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
