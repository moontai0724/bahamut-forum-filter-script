import KeywordConfigItem from "../../../configs/keyword/KeywordConfigItem";
import KeywordConfigManager from "../../../configs/keyword/KeywordConfigManager";
import KeywordEditorDialog from "../../keyword-editor-dialog/KeywordEditorDialog";
import UIController from "../../UIController";
import ElementItem from "../ElementItem";
import KeywordItem from "../keyword-item/KeywordItem";
import style from "./keyword-block.css";

export default class KeywordBlock extends ElementItem {
  public constructor(keywords: KeywordConfigItem[]) {
    super(document.createElement("div"));
    this.element.classList.add("keyword-block");

    const button = document.createElement("button");
    button.innerText = "新增關鍵字";
    button.id = "add-keyword";
    button.classList.add("btn", "btn-primary");
    button.addEventListener("click", () => {
      const dialog = new KeywordEditorDialog();
      dialog.form?.addEventListener("submit", event => {
        event.preventDefault();

        const keyword = dialog.getData();

        if (KeywordConfigManager.isExist(keyword)) {
          console.log("Keyword already exists.", keyword.toData());
          Dialogify.alert("關鍵字已存在！請編輯現有關鍵字。");
          return;
        }

        KeywordConfigManager.add(keyword);
        dialog.dialog.close();
        UIController.openWindow();
      });
    });
    this.element.appendChild(button);

    const description = document.createElement("div");
    description.classList.add("description");
    description.innerText =
      "綠色代表有開啟，紅色代表沒有開啟。當「關鍵字」與「完全符合」的設定相同時，會判斷為同一個條件。";
    this.element.appendChild(description);

    for (const keyword of keywords) {
      const keywordItem = new KeywordItem(keyword);
      this.element.appendChild(keywordItem.element);
    }

    ElementItem.addStyle(this.constructor.name, style);
  }
}
