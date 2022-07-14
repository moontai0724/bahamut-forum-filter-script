import KeywordFilter from "../../filters/KeywordFilter";
import Handler from "../Handler";

export default class DesktopGoogleSearchHandler extends Handler {
  public constructor() {
    const titleFilter = new KeywordFilter(".gs-title", "post");
    const contentFilter = new KeywordFilter(".gs-snippet", "post");

    super(".gsc-result", [titleFilter, contentFilter]);
  }
}
