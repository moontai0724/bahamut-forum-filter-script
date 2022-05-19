import KeywordFilter from "../../filters/KeywordFilter";
import Handler from "../Handler";

export default class DesktopGoogleSearchHandler extends Handler {
  public constructor() {
    const titleFilter = new KeywordFilter(".gs-title");
    const contentFilter = new KeywordFilter(".gs-snippet");

    super(".gsc-result", [titleFilter, contentFilter]);
  }
}
