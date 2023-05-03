import ElementItem from "../ElementItem";
import UserConfigItem from "../../../configs/user/UserConfigItem";
import style from "./user-item.css";

export default class UserItem extends ElementItem {
  public constructor(user: UserConfigItem) {
    super(document.createElement("div"));
    this.element.classList.add("user-item");

    const item = document.createElement("div");
    this.element.appendChild(item);
    
    const link = document.createElement("a");
    link.href = `https://home.gamer.com.tw/${user.account}`;
    link.target = "_blank";
    link.innerText = user.account;
    item.appendChild(link);

    ElementItem.addStyle(this.constructor.name, style);
  }
}
