import DesktopListHandler from "../../handlers/desktop/DesktopListHandler";
import DesktopRecommendHandler from "../../handlers/desktop/DesktopRecommendHandler";
import Page from "../Page";

export default class DesktopBPage extends Page {
  public static readonly device: DeviceType = "desktop";
  public static readonly pathname: PageType = "/B.php";

  public constructor() {
    const listHandler = new DesktopListHandler();
    const recommendHandler = new DesktopRecommendHandler();
    super([listHandler, recommendHandler]);
  }
}
