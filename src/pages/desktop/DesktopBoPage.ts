import DesktopListHandler from "../../handlers/desktop/DesktopListHandler";
import Page from "../Page";

export default class DesktopBoPage extends Page {
  public static readonly device: DeviceType = "desktop";
  public static readonly pathname: PageType = "/Bo.php";

  public constructor() {
    const listHandler = new DesktopListHandler();
    super([listHandler]);
  }
}
