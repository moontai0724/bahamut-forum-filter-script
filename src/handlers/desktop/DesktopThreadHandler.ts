import KeywordFilter from "../../filters/KeywordFilter";
import UserFilter from "../../filters/UserFilter";
import Handler from "../Handler";

export default class DesktopThreadHandler extends Handler {
  public constructor() {
    const contentFilter = new KeywordFilter(".c-article__content");
    const userFilter = new UserFilter(".userid");

    super(".c-section[id]", [contentFilter, userFilter]);
  }
}
