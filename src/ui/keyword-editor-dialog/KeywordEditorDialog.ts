import KeywordConfigItem from "../../configs/keyword/KeywordConfigItem";
import Checkbox from "../components/checkbox/Checkbox";
import UIController from "../UIController";
import style from "./keyword-editor-dialog.css";

export default class KeywordEditorDialog {
  public dialog: Dialogify;
  public form: HTMLFormElement | undefined;

  public constructor(keyword: KeywordConfigItem | null = null) {
    console.log("Creating keyword editor dialog: ", keyword);
    const element = document.createElement("div");

    const keywordInput = document.createElement("input");
    element.appendChild(keywordInput);
    keywordInput.type = "text";
    keywordInput.required = true;
    keywordInput.autofocus = true;
    keywordInput.name = "keyword";
    keywordInput.placeholder = "請輸入關鍵字";
    keywordInput.classList.add("text-field");
    if (keyword) keywordInput.setAttribute("value", keyword.getOriginalText());

    const fullMatch = new Checkbox(
      "fullMatch",
      "須完全符合",
      keyword?.full ?? false,
      {
        title: "如果勾選，則內容必須完全符合輸入的條件才會被過濾",
      },
    );
    element.appendChild(fullMatch.element);

    const matchPost = new Checkbox(
      "matchPost",
      "過濾文章",
      keyword?.matches.post ?? true,
      {
        title: "是否將此條件套用至文章",
      },
    );
    element.appendChild(matchPost.element);

    const matchComment = new Checkbox(
      "matchComment",
      "過濾留言",
      keyword?.matches.comment ?? true,
      {
        title: "是否將此條件套用至留言",
      },
    );
    element.appendChild(matchComment.element);

    this.dialog = new Dialogify(element.innerHTML, {
      closable: false,
      useDialogForm: true,
      dialog: {
        contentClassName: "keyword-editor-dialog",
      },
    })
      .title(`${keyword ? "編輯" : "新增"}關鍵字`)
      .buttons([
        {
          type: Dialogify.BUTTON_PRIMARY,
          text: "確定",
          focused: true,
        },
        {
          type: Dialogify.BUTTON_DANGER,
          text: "取消",
          click: (): void => {
            this.dialog.close();
            UIController.openWindow();
          },
        },
      ]);

    this.form = this.dialog.$content.parents("form").get(0);

    if (!this.form) {
      this.dialog.close();
      Dialogify.alert("Oops, 出了一點錯誤！請回報給作者。(K_E_D)");
      throw new Error(
        "Cannot create keyword editor dialog. (form element not found)",
      );
    }

    const styles = document.createElement("style");
    styles.innerHTML = style;

    this.dialog.on("show", event =>
      event.target.$content.find(".dialogify__body").append(styles),
    );

    this.dialog.showModal();
  }

  public getData(): KeywordConfigItem {
    const formData = new FormData(this.form);
    const value = formData.get("keyword") as string;
    const escaped = value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const keyword = new KeywordConfigItem(escaped, formData.has("fullMatch"), {
      post: formData.has("matchPost"),
      comment: formData.has("matchComment"),
    });

    return keyword;
  }
}
