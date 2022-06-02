import DesktopListHandler from "../../handlers/desktop/DesktopListHandler";
import DesktopRecommendHandler from "../../handlers/desktop/DesktopRecommendHandler";
import Page from "../Page";

export default class DesktopBPage extends Page {
  public static device: DeviceType = "desktop";
  public static pathname: PageType = "/B.php";

  public constructor() {
    const listHandler = new DesktopListHandler();
    const recommendHandler = new DesktopRecommendHandler();
    super([listHandler, recommendHandler]);
  }
}
