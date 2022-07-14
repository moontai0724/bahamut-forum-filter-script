import LengthConfigManager from "../configs/length/LengthConfigManager";
import Filter from "./Filter";

export default class LengthFilter extends Filter {
  constructor(selector: string, contentType: ContentType) {
    super(selector, contentType);
  }

  public test(element: Element): boolean {
    console.info("testing length at element: ", element, this.selector);
    const target = element.querySelector(this.selector);

    if (!target) {
      console.error(
        "LengthFilter: target element not found",
        element,
        this.selector,
        target,
      );
      return true;
    }

    LengthConfigManager.load();

    if (!LengthConfigManager.enabled[this.contentType]) {
      console.info(
        "LengthFilter: length filter disabled for content type: ",
        this.contentType,
      );
      return true;
    }

    const limit =
      LengthConfigManager.items.find(i => i.contentType === this.contentType)
        ?.limit ?? -1;

    if ((target.textContent?.length ?? 0) <= limit) {
      console.info(
        "LengthFilter: content is less than defined length limit: ",
        limit,
        ", hiding element: ",
        element,
      );

      return false;
    }

    return true;
  }
}
