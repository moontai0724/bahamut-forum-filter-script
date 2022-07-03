import KeywordFilter from "../../filters/KeywordFilter";
import LengthFilter from "../../filters/LengthFilter";
import UserFilter from "../../filters/UserFilter";
import Handler from "../Handler";

export default class DesktopThreadHandler extends Handler {
  public constructor() {
    const contentFilter = new KeywordFilter(".c-article__content");
    const contentLengthFilter = new LengthFilter(".c-article__content", "post");
    const userFilter = new UserFilter(".userid");

    super(".c-section[id]", [contentFilter, userFilter, contentLengthFilter]);
  }
}
