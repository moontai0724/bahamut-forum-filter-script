import KeywordConfigManager from "../../../configs/keyword/KeywordConfigManager";
import KeywordEditorDialog from "../../keyword-editor-dialog/KeywordEditorDialog";
import UIController from "../../UIController";
import ElementItem from "../ElementItem";
import style from "./keyword-block.css";

export default class KeywordBlock extends ElementItem {
  public constructor() {
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

    ElementItem.addStyle(this.constructor.name, style);
  }
}
