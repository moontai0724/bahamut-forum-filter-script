import KeywordFilter from "../../filters/KeywordFilter";
import Handler from "../Handler";

export default class DesktopRecommendHandler extends Handler {
  public constructor() {
    const titleFilter = new KeywordFilter(".name");

    super(".popular__item", [titleFilter]);
  }
}
