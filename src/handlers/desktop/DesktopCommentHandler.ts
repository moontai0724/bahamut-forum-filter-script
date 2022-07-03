import KeywordFilter from "../../filters/KeywordFilter";
import LengthFilter from "../../filters/LengthFilter";
import UserFilter from "../../filters/UserFilter";
import Handler from "../Handler";

export default class DesktopCommentHandler extends Handler {
  public constructor() {
    const contentFilter = new KeywordFilter(".reply-content__article");
    const contentLengthFilter = new LengthFilter(
      ".reply-content__article",
      "comment",
    );
    const userFilter = new UserFilter(".reply-content__user");

    super(".c-reply__item[id]", [
      contentFilter,
      userFilter,
      contentLengthFilter,
    ]);
  }
}
