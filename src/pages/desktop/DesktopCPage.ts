import DesktopCommentHandler from "../../handlers/desktop/DesktopCommentHandler";
import DesktopRecommendHandler from "../../handlers/desktop/DesktopRecommendHandler";
import DesktopThreadHandler from "../../handlers/desktop/DesktopThreadHandler";
import Page from "../Page";

export default class DesktopCPage extends Page {
  public static device: DeviceType = "desktop";
  public static pathname: PageType = "/C.php";

  public constructor() {
    const threadHandler = new DesktopThreadHandler();
    const commentHandler = new DesktopCommentHandler();
    const recommendHandler = new DesktopRecommendHandler();
    super([threadHandler, commentHandler, recommendHandler]);
  }
}
