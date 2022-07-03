import UserFromSystemManager from "../configs/user-system/UserFromSystemManager";
import UserConfigItem from "../configs/user/UserConfigItem";
import UserConfigManager from "../configs/user/UserConfigManager";
import Filter from "./Filter";

export default class UserFilter extends Filter {
  static users: string[] = [];

  constructor(selector: string) {
    super(selector);
  }

  public test(element: Element): boolean {
    console.info("testing user at element: ", element);
    const target = element.querySelector(this.selector);
    if (!target) {
      console.error(
        "UserFilter: target element not found",
        element,
        this.selector,
        target,
      );
      return true;
    }

    const author = target.getAttribute("href")?.split(/[/=]/).pop();
    if (!author) {
      console.error("UserFilter: author not found", target);
      throw new Error("UserFilter: author not found");
    }

    const blockedUsers = this.migrateBlockedUsers();
    if (blockedUsers.includes(author)) {
      console.info(
        "UserFilter: matched user: ",
        author,
        ", hiding element: ",
        element,
      );

      return false;
    }

    return true;
  }

  public migrateBlockedUsers(): string[] {
    if (UserFilter.users.length) return UserFilter.users;

    const systemDeniedUsers = UserFromSystemManager.load() as UserConfigItem[];
    const customDeniedUsers = UserConfigManager.load() as UserConfigItem[];
    customDeniedUsers.forEach(user => {
      const existingRecordIndex = systemDeniedUsers.findIndex(
        item => item.account === user.account,
      );
      if (existingRecordIndex > -1) {
        if (user.type === "allow") {
          systemDeniedUsers.splice(existingRecordIndex, 1);
        }
        return;
      }

      if (user.type === "allow") return;

      systemDeniedUsers.push(user);
    });
    UserFilter.users = systemDeniedUsers.map(user => user.account);

    if (UserFilter.users.length === 0)
      UserFilter.users.push("%Waiting for user list%");

    return UserFilter.users;
  }
}
