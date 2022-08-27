import style from "./app.css";
import ElementItem from "./components/ElementItem";
import SettingWindow from "./setting-window/SettingWindow";

export default class UIController {
  public static instance?: Dialogify;
  public static window?: SettingWindow;

  public static initialize(): void {
    GM_addStyle(style);

    const menu = document.querySelector(".BH-menuE");
    if (!menu) throw new Error("Can't get menu");

    document.body.classList.add("baha-forum-filter-enabled");

    const filterSwitch = document.createElement("li");
    filterSwitch.id = "baha-forum-filter-status-switcher";
    filterSwitch.innerHTML = "<a><span></span>過濾器</a>";
    filterSwitch.addEventListener("click", () => {
      document.body.classList.toggle("baha-forum-filter-enabled");
    });
    menu.appendChild(filterSwitch);

    const filterSetting = document.createElement("li");
    filterSetting.id = "baha-forum-filter-setting-window";
    filterSetting.innerHTML = "<a>過濾器設定</a>";
    filterSetting.addEventListener("click", () => this.openWindow());
    menu.appendChild(filterSetting);
  }

  public static openWindow(): void {
    if (this.instance && this.instance.isOpen()) return;
    if (this.window) delete this.window;

    this.instance = new Dialogify("", { size: Dialogify.SIZE_LARGE });
    this.instance.title("過濾器設定");

    this.window = new SettingWindow();
    const styles = document.createElement("style");
    styles.innerHTML = Object.values(ElementItem.styles).join("\n");

    this.instance.on("show", event =>
      event.target.$content
        .find(".dialogify__body")
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        .append(this.window!.element, styles),
    );

    this.instance.showModal();
  }
}
