import DesktopCommentHandler from "../../handlers/desktop/DesktopCommentHandler";
import DesktopRecommendHandler from "../../handlers/desktop/DesktopRecommendHandler";
import DesktopThreadHandler from "../../handlers/desktop/DesktopThreadHandler";
import Page from "../Page";

export default class DesktopCoPage extends Page {
  public static readonly device: DeviceType = "desktop";
  public static readonly pathname: PageType = "/Co.php";

  public constructor() {
    const threadHandler = new DesktopThreadHandler();
    const commentHandler = new DesktopCommentHandler();
    const recommendHandler = new DesktopRecommendHandler();
    super([threadHandler, commentHandler, recommendHandler]);
  }
}
