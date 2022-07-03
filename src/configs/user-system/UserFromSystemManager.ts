import ConfigManager from "../common/ConfigManager";
import UserConfigItem from "../user/UserConfigItem";

export default class UserFromSystemManager extends ConfigManager {
  public static readonly key = "users-system";
  public static itemClass = UserConfigItem;
  public static items: UserConfigItem[] = [];

  /**
   * Load the denylist from local storage and update.
   * @returns
   */
  public static load(): UserConfigItem[] {
    this.update();
    return super.load() as UserConfigItem[];
  }

  /**
   * Update the denylist from Bahamut server, will cache data in local for a day.
   * @param forceUpdate If true, will fetch from server even if the cache is not expired.
   * @returns Array of UserFromSystemItem instance.
   */
  public static async update(forceUpdate = false): Promise<UserConfigItem[]> {
    if (!forceUpdate) {
      const lastFetchTime = GM_getValue("last-fetch-denylist-time", 0);
      const now = Date.now();
      if (now - lastFetchTime < 1000 * 60 * 60 * 24) {
        console.info("Denylist from system is up to date in a day.");
        return this.items;
      }
      GM_setValue("last-fetch-denylist-time", now - 1000 * 60 * 60 * 24 + 1000);
    }

    const accounts = await this.fetch();
    this.items = accounts.map(account => new UserConfigItem(account));
    this.save();
    GM_setValue("last-fetch-denylist-time", Date.now());

    return this.items;
  }

  /**
   * Fetch accounts from Bahamut server.
   * @returns Array of accounts.
   */
  public static fetch(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      GM_xmlhttpRequest({
        method: "GET",
        url: "https://home.gamer.com.tw/ajax/friend_getData.php?here=0",
        onload: response => {
          console.info("Got respond from Bahamut server: ", response);
          const tempContainer = document.createElement("div");
          tempContainer.innerHTML = response.responseText;

          const elements = tempContainer.querySelectorAll("tr .gamercard");
          const userAccounts = Array.from(elements).map(element => {
            const attribute = element.getAttribute("data-gamercard-userid");
            if (!attribute)
              throw new Error(
                "Got error when parsing responsed blocklist from server.",
              );

            return attribute.toLowerCase();
          });
          console.info("responsed blocked users: ", userAccounts);
          resolve(userAccounts);
        },
        onerror: err => {
          console.error("Responsed Error: ", err);
          reject(err);
        },
        ontimeout: () => {
          console.error("Response timeout: ");
          reject();
        },
      });
    });
  }
}
