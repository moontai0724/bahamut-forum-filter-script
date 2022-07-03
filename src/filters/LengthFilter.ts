import LengthConfigItem from "../configs/length/LengthConfigItem";
import LengthConfigManager from "../configs/length/LengthConfigManager";
import Filter from "./Filter";

export default class LengthFilter extends Filter {
  constructor(selector: string, public contentType: ContentType) {
    super(selector);
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

    const conditions = LengthConfigManager.load() as LengthConfigItem[];

    const limit =
      conditions.find(i => i.contentType === this.contentType)?.limit ?? 0;

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
