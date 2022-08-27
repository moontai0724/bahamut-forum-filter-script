import KeywordConfigItem from "../../../configs/keyword/KeywordConfigItem";
import KeywordConfigManager from "../../../configs/keyword/KeywordConfigManager";
import KeywordEditorDialog from "../../keyword-editor-dialog/KeywordEditorDialog";
import UIController from "../../UIController";
import ElementItem from "../ElementItem";
import style from "./keyword-item.css";

export default class KeywordItem extends ElementItem {
  public constructor(keyword: KeywordConfigItem) {
    super(document.createElement("div"));
    this.element.classList.add("keyword-item");

    const status = document.createElement("div");
    status.classList.add("status");
    this.element.appendChild(status);

    const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.classList.add("fa");
    editButton.title = "編輯";
    editButton.innerHTML = "&#xf044;";
    editButton.addEventListener("click", event => {
      event.preventDefault();
      console.log("Edit keyword: ", keyword.toData());
      const dialog = new KeywordEditorDialog(keyword);
      dialog.form?.addEventListener("submit", event => {
        event.preventDefault();

        const modifiedKeyword = dialog.getData();

        keyword.value = modifiedKeyword.value;
        keyword.full = modifiedKeyword.full;
        keyword.matches.post = modifiedKeyword.matches.post;
        keyword.matches.comment = modifiedKeyword.matches.comment;

        Dialogify.closeAll();
        UIController.openWindow();
      });
    });
    status.appendChild(editButton);

    const fullMatchIcon = document.createElement("i");
    fullMatchIcon.classList.add("fa");
    fullMatchIcon.title = "完全符合";
    fullMatchIcon.innerHTML = "&#x3d;";
    fullMatchIcon.style.color = keyword.full ? "green" : "red";
    status.appendChild(fullMatchIcon);

    const matchPostIcon = document.createElement("i");
    matchPostIcon.classList.add("fa");
    matchPostIcon.title = "過濾文章";
    matchPostIcon.innerHTML = "&#xf15c;";
    matchPostIcon.style.color = keyword.matches.post ? "green" : "red";
    status.appendChild(matchPostIcon);

    const matchCommentIcon = document.createElement("i");
    matchCommentIcon.classList.add("fa");
    matchCommentIcon.title = "過濾留言";
    matchCommentIcon.style.color = keyword.matches.comment ? "green" : "red";
    matchCommentIcon.innerHTML = "&#xf0ca;";
    status.appendChild(matchCommentIcon);

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.title = "刪除";
    deleteButton.classList.add("fa");
    deleteButton.innerHTML = "&#xf1f8;";
    deleteButton.addEventListener("click", event => {
      event.preventDefault();
      console.log("Delete keyword: ", keyword.toData());
      KeywordConfigManager.remove(keyword);
      this.element.remove();
    });
    status.appendChild(deleteButton);

    const text = document.createElement("div");
    text.classList.add("text");
    text.innerText = keyword.getOriginalText();
    this.element.appendChild(text);

    ElementItem.addStyle(this.constructor.name, style);
  }
}
