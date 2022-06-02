import DesktopGoogleSearchHandler from "../../handlers/desktop/DesktopGoogleSearchHandler";
import Page from "../Page";

export default class DesktopSearchPage extends Page {
  public static device: DeviceType = "desktop";
  public static pathname: PageType = "/search.php";

  public constructor() {
    const googleSearchHandler = new DesktopGoogleSearchHandler();
    super([googleSearchHandler]);
  }
}
