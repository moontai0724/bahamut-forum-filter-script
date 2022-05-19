import DesktopListHandler from "../../handlers/desktop/DesktopListHandler";
import Page from "../Page";

export default class DesktopBoPage extends Page {
  public static device: "desktop";
  public static pathname: "/Bo.php";

  public constructor() {
    const listHandler = new DesktopListHandler();
    super([listHandler]);
  }
}
