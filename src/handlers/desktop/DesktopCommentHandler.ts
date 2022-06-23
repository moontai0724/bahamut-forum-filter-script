import KeywordFilter from "../../filters/KeywordFilter";
import Handler from "../Handler";

export default class DesktopCommentHandler extends Handler {
  public constructor() {
    const contentFilter = new KeywordFilter(".reply-content__article");

    super(".c-reply__item[id]", [contentFilter]);
  }
}
