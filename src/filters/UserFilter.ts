import UserFromSystemManager from "../configs/user-system/UserFromSystemManager";
import UserConfigManager from "../configs/user/UserConfigManager";
import Filter from "./Filter";

export default class UserFilter extends Filter {
  public static users: string[] = [];

  public constructor(selector: string, contentType: ContentType) {
    super(selector, contentType);
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
    if (!UserConfigManager.enabled[this.contentType]) {
      console.info(
        "UserFilter: user filter disabled for content type: ",
        this.contentType,
      );
      return true;
    }

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

    UserConfigManager.load();
    UserFromSystemManager.load();
    const systemDeniedUsers = UserFromSystemManager.items;
    const customDeniedUsers = UserConfigManager.items;
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
