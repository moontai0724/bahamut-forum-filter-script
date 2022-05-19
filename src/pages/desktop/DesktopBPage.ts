import DesktopListHandler from "../../handlers/desktop/DesktopListHandler";
import DesktopRecommendHandler from "../../handlers/desktop/DesktopRecommendHandler";
import Page from "../Page";

export default class DesktopBPage extends Page {
  public static device: "desktop";
  public static pathname: "/B.php";

  public constructor() {
    const listHandler = new DesktopListHandler();
    const recommendHandler = new DesktopRecommendHandler();
    super([listHandler, recommendHandler]);
  }
}
