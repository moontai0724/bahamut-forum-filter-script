import DesktopBoPage from "./pages/desktop/DesktopBoPage";
import DesktopBPage from "./pages/desktop/DesktopBPage";
import DesktopCoPage from "./pages/desktop/DesktopCoPage";
import DesktopCPage from "./pages/desktop/DesktopCPage";
import DesktopSearchPage from "./pages/desktop/DesktopSearchPage";
import UIController from "./ui/UIController";

UIController.initialize();

const device: DeviceType =
  location.hostname === "m.gamer.com.tw" ? "mobile" : "desktop";

const pageControllers = [
  DesktopBPage,
  DesktopBoPage,
  DesktopCPage,
  DesktopCoPage,
  DesktopSearchPage,
];

const MatchedPageController = pageControllers.find(page =>
  page.isMatch(device, location.pathname),
);

if (!MatchedPageController) {
  throw new Error(`No matched page controller for ${location.pathname}`);
}

const controller = new MatchedPageController();
controller.execute();
