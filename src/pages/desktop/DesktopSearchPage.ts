import DesktopGoogleSearchHandler from "../../handlers/desktop/DesktopGoogleSearchHandler";
import Page from "../Page";

export default class DesktopSearchPage extends Page {
  public static device: "desktop";
  public static pathname: "/search.php";

  public constructor() {
    const googleSearchHandler = new DesktopGoogleSearchHandler();
    super([googleSearchHandler]);
  }
}
