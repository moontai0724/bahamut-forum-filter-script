// ==UserScript==
// @name         巴哈列表過濾器 - 設定
// @namespace    https://home.gamer.com.tw/moontai0724
// @version      4.0
// @description  用於 巴哈列表過濾器 的腳本設定
// @author       moontai0724
// @match        https://forum.gamer.com.tw/*
// @match        https://forum.gamer.com.tw/B.php*
// @match        https://forum.gamer.com.tw/Bo.php*
// @match        https://forum.gamer.com.tw/C.php*
// @match        https://forum.gamer.com.tw/Co.php*
// @match        https://forum.gamer.com.tw/search.php*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @supportURL   https://home.gamer.com.tw/creationDetail.php?sn=3962393
// @require      https://cdn.jsdelivr.net/npm/vue/dist/vue.js
// @license      MIT
// ==/UserScript==

class HBLConfig {
    featureSwitches = new class {
        keyword = new featureSwitch("關鍵詞過濾開關")
        id = new featureSwitch("黑名單過濾開關")
        length = new featureSwitch("字數過濾開關")
        height = new featureSwitch("高樓過濾開關")
    };
    limits = new class {
        length = new class {
            post;
            comment;

            get post() {
                return this.post;
            }

            set post(length) {
                this.post = length;
            }

            get comment() {
                return this.comment;
            }

            set comment(length) {
                this.comment = length;
            }
        };
        height = new class {

        };
        id = new idList();
        keyword = new class {
            fullMatch = new keywordList("關鍵詞設定 - 完全符合");
            partMatch = new keywordList("關鍵詞設定 - 部分符合");
        };
    };

    constructor() {
        if (this.isOldConfig()) {
            this.upgradeConfigStructure();
        }
    }

    isOldConfig() {
        return GM_getValue("HBL_Config") === undefined && localStorage.getItem("BLH_Setting") !== null;
    }

    upgradeConfigStructure() {

    }
}

class featureSwitch {
    name;
    post;
    comment;

    constructor(name, post = true, comment = true) {
        this.name = name;
        this.post = post;
        this.comment = comment;
    }

    get name() {
        return this.name;
    }

    get post() {
        return this.post;
    }

    set post(status) {
        this.post = status;
    }

    get comment() {
        return this.comment;
    }

    set comment(status) {
        this.comment = status;
    }
}

class keywordList {
    name;
    post;
    comment;

    constructor(name, post = [], comment = []) {
        this.name = name;
        this.post = post;
        this.comment = comment;
    }

    get name() {
        return this.name;
    }

    get post() {
        return this.post.filter(value => !this.comment.includes(value));
    }

    postAll() {
        return this.post;
    }

    set post(keyword) {
        if (this.post.includes(keyword)) {
            this.post.splice(this.post.indexOf(keyword), 1);
        } else {
            this.post.push(keyword);
        }
    }

    get comment() {
        return this.comment.filter(value => !this.post.includes(value));
    }

    commentAll() {
        return this.comment;
    }

    set comment(keyword) {
        if (this.comment.includes(keyword)) {
            this.comment.splice(this.comment.indexOf(keyword), 1);
        } else {
            this.comment.push(keyword);
        }
    }

    get both() {
        return this.post.filter(value => this.comment.includes(value));
    }

    set both(keyword) {
        Object.getOwnPropertyDescriptor(this.__proto__, "post").set.call(this, keyword);
        Object.getOwnPropertyDescriptor(this.__proto__, "comment").set.call(this, keyword);
    }
}

class idList {
    whitelist;
    blacklist;
    blocked;

    constructor(whitelist = [], blacklist = [], blocked = []) {
        this.whitelist = whitelist;
        this.blacklist = blacklist;
        this.blocked = blocked;
    }

    get whitelist() {
        return this.whitelist;
    }

    set whitelist(id) {
        if (this.whitelist.includes(id)) {
            this.whitelist.splice(this.whitelist.indexOf(id), 1);
        } else {
            this.whitelist.push(id);
        }
    }

    get blacklist() {
        return this.blacklist
            .concat(this.blocked)
            .filter((value, index, array) => array.blacklist.indexOf(value) === index);
    }

    set blacklist(id) {
        if (this.blacklist.includes(id)) {
            this.blacklist.splice(this.blacklist.indexOf(id), 1);
        } else {
            this.blacklist.push(id);
        }
    }

    set blocked(blocklist) {
        this.blocked = blocklist;
    }
}