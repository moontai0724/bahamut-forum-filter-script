import KeywordFilter from "../../filters/KeywordFilter";
import LengthFilter from "../../filters/LengthFilter";
import UserFilter from "../../filters/UserFilter";
import Handler from "../Handler";

export default class DesktopListHandler extends Handler {
  public constructor() {
    const titleFilter = new KeywordFilter(".b-list__main__title");
    const contentFilter = new KeywordFilter(".b-list__brief");
    const contentLengthFilter = new LengthFilter(".b-list__brief", "post");
    const userFilter = new UserFilter(".b-list__count__user>a");

    super(".b-list-item", [
      titleFilter,
      contentFilter,
      userFilter,
      contentLengthFilter,
    ]);
  }
}
