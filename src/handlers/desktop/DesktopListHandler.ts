import KeywordFilter from "../../filters/KeywordFilter";
import Handler from "../Handler";

export default class DesktopListHandler extends Handler {
  public constructor() {
    const titleFilter = new KeywordFilter(".b-list__main__title");
    const contentFilter = new KeywordFilter(".b-list__brief");

    super(".b-list-item", [titleFilter, contentFilter]);
  }
}
