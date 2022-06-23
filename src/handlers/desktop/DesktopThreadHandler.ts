import KeywordFilter from "../../filters/KeywordFilter";
import Handler from "../Handler";

export default class DesktopThreadHandler extends Handler {
  public constructor() {
    const contentFilter = new KeywordFilter(".c-article__content");

    super(".c-section[id]", [contentFilter]);
  }
}
