import ElementItem from "../ElementItem";
import UserConfigItem from "../../../configs/user/UserConfigItem";
import UserFromSystemManager from "../../../configs/user-system/UserFromSystemManager";
import UserItem from "../user-item/UserItem";
import style from "./system-user-block.css";

export default class SystemUserBlock extends ElementItem {
  public constructor() {
    super(document.createElement("div"));
    this.element.classList.add("system-user-block");

    const description = document.createElement("h2");
    description.innerText = `您於巴哈封鎖的使用者`;
    this.element.appendChild(description);

    const lastUpdateTime = new Date(
      GM_getValue("last-fetch-denylist-time", 0),
    ).toLocaleString("zh-TW", {
      timeZone: "Asia/Taipei",
      hour12: false,
    });
    const lastUpdate = document.createElement("span");
    lastUpdate.innerText = `最後更新時間：${lastUpdateTime}`;
    this.element.appendChild(lastUpdate);

    const button = document.createElement("button");
    button.innerText = "強制更新黑名單";
    button.id = "force-fetch";
    button.classList.add("btn", "btn-primary");
    button.addEventListener("click", async () => {
      await UserFromSystemManager.update(true);
      Dialogify.alert("已更新黑名單。");
    });
    this.element.appendChild(button);

    const systemUserList = UserFromSystemManager.load();
    this.renderUserList(systemUserList);

    ElementItem.addStyle(this.constructor.name, style);
  }

  public renderUserList(systemUserList: UserConfigItem[]): void {
    this.element
      .querySelectorAll(".user-item")
      .forEach(element => element.remove());

    for (const user of systemUserList) {
      const userItem = new UserItem(user);
      this.element.appendChild(userItem.element);
    }
  }
}
