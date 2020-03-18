// ==UserScript==
// @name         巴哈列表過濾器
// @namespace    https://home.gamer.com.tw/moontai0724
// @version      4.0
// @description  在巴哈姆特透過「黑名單、關鍵字、字數限制」過濾文章、留言，在頂端列可以開關過濾器（一次性）
// @author       moontai0724
// @match        https://forum.gamer.com.tw/B.php*
// @match        https://forum.gamer.com.tw/Bo.php*
// @match        https://forum.gamer.com.tw/C.php*
// @match        https://forum.gamer.com.tw/Co.php*
// @match        https://forum.gamer.com.tw/search.php*
// @require      https://cdn.jsdelivr.net/npm/vue/dist/vue.js
// @resource     popup_window https://raw.githubusercontent.com/moontai0724/HideBlockList/master/popup_window.vue
// @resource     main.css https://raw.githubusercontent.com/moontai0724/HideBlockList/master/main.css
// @grant        GM_xmlhttpRequest
// @grant        GM_getResourceText
// @grant        GM_addStyle
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// @connect      home.gamer.com.tw
// @supportURL   https://home.gamer.com.tw/creationDetail.php?sn=3962393
// @license      MIT
// ==/UserScript==

(function (jQuery) {
    'use strict';
    let config = getConfig();

    (function initializeScript() {
        // add main style: hide element
        GM_addStyle(GM_getResourceText("main.css"));

        // switch display listener
        jQuery(".BH-menuE").append('<li class="HBL toggleStatus"><a><span></span>過濾器</a></li>');
        jQuery(".HBL.toggleStatus").on("click", toggleHideStatus);

        // open setting window listener
        jQuery(".BH-menuE").append('<li class="HBL openSetting"><a>過濾器設定</a></li>');
        jQuery(".HBL.openSetting").on("click", openSettingWindow);

        // popup window loaded listener
        jQuery("body").append('<button id="HBL_popup_window_loaded_listener" style="display: none;"></button>');
        jQuery("#HBL_popup_window_loaded_listener").on("click", initializeSettingWindow);
    })();

    /**
     * To get config from script storage
     * If old config exists, convert it from local storage to script storage
     */
    function getConfig() {
        let tempConfig = GM_getValue("HBL_Config");

        // Convert local storage to script storage
        if (tempConfig === undefined && localStorage.getItem("BLH_Setting")) {
            const oldConfig = JSON.parse(localStorage.getItem("BLH_Setting"));
            tempConfig = {
                "switch": {
                    "keyword": {
                        "post": oldConfig.switch.keywordPostFilter,
                        "comment": oldConfig.switch.keywordCommentFilter
                    },
                    "id": {
                        "post": oldConfig.switch.blacklistPostFilter,
                        "comment": oldConfig.switch.blacklistCommentFilter
                    },
                    "length": {
                        "post": oldConfig.switch.contentLengthPostFilter,
                        "comment": oldConfig.switch.contentLengthCommentFilter
                    }
                },
                "data": {
                    "length": {
                        "post": oldConfig.lengthLimit.contentLengthPostLimit,
                        "comment": oldConfig.lengthLimit.contentLengthCommentLimit
                    },
                    "id": {
                        "whitelist": oldConfig.data.forceShowList,
                        "blacklist": oldConfig.data.forceHideList
                    },
                    "keyword": {
                        "fullMatch": {
                            "both": oldConfig.data.blockKeywordsFC,
                            "post": oldConfig.data.postBlockKeywordsFC,
                            "comment": oldConfig.data.commentBlockKeywordsFC
                        },
                        "partMatch": {
                            "both": oldConfig.data.blockKeywordsPC,
                            "post": oldConfig.data.postBlockKeywordsPC,
                            "comment": oldConfig.data.commentBlockKeywordsPC
                        }
                    }
                }
            };
            GM_setValue("HBL_Config", tempConfig);
            localStorage.removeItem("BLH_Setting");
        } else if (tempConfig === undefined) {
            tempConfig = {
                "switch": {
                    "keyword": {
                        "name": "關鍵詞過濾開關",
                        "post": true,
                        "comment": true
                    },
                    "id": {
                        "name": "黑名單過濾開關",
                        "post": true,
                        "comment": true
                    },
                    "length": {
                        "name": "字數過濾開關",
                        "post": true,
                        "comment": true
                    }
                },
                "data": {
                    "length": {
                        "post": 2,
                        "comment": 2
                    },
                    "id": {
                        "whitelist": [],
                        "blacklist": []
                    },
                    "keyword": {
                        "fullMatch": {
                            "name": "關鍵詞設定 - 完全符合",
                            "both": [],
                            "post": [],
                            "comment": []
                        },
                        "partMatch": {
                            "name": "關鍵詞設定 - 部分符合",
                            "both": [],
                            "post": [],
                            "comment": []
                        }
                    }
                }
            };
        }

        return tempConfig;
    }

    /**
     * To save config
     */
    function saveConfig() {
        GM_setValue("HBL_Config", config);
    }

    /**
     * To reset config
     */
    function resetConfigHandler() {
        if (window.confirm("確定要初始化設定？")) {
            GM_deleteValue("HBL_Config");
            config = getConfig();
        }
    }

    /**
     * Handle click event of manual restore button
     */
    function restoreConfigHandler() {
        let configFromUser = jQuery(".manualRestore input[type=text]").val().replace(/\s/g, "");

        // check input is JSON or not
        if (isJSON(configFromUser)) {
            configFromUser = JSON.parse(configFromUser);
        } else {
            window.alert("請在輸入框中貼上正確的設定！");
            return false;
        }

        if (compareStructure(config, configFromUser) === false) {
            window.confirm("輸入的設定有錯誤，還原設定失敗。");
            return false;
        }

        config = configFromUser;
        saveConfig();
        closeSettingWindowHandler();
        openSettingWindow();
    }

    /**
     * Compare two data structure is same or not.
     * @param {JSON} reference Source data to compare.
     * @param {JSON} target Target data to compare.
     * @returns {Boolean} Two data is compare or not
     */
    function compareStructure(reference, target) {
        let isDifferent = false, isReferenceJSON = isJSON(reference), isTargetJSON = isJSON(target);

        if (isReferenceJSON && isTargetJSON) {
            reference = parseJSON(reference);
            target = parseJSON(target);

            for (let index in reference) {
                isDifferent = (isDifferent || !compareStructure(reference[index], target[index]));
                if (isDifferent) {
                    break;
                }
            }
        } else {
            isDifferent = (typeof reference !== typeof target) || (isReferenceJSON !== isTargetJSON);
        }

        return !isDifferent;
    }

    /**
     * To judge data is JSON or not.
     * @param data Data to compare
     * @returns {Boolean} Data is JSON or not.
     */
    function isJSON(data) {
        try {
            if (typeof data === "object")
                data = JSON.stringify(data);
            if (typeof data === "string")
                data = JSON.parse(data);

            return typeof data === "object" && data.length === undefined;
        } catch (e) {
            return false;
        }
    }

    /**
     * Parse JSON, if not JSON, return original variable.
     * @param {*} data Data to parse.
     * @returns {*}
     */
    function parseJSON(data) {
        if (isJSON(data)) {
            if (typeof data === "object")
                data = JSON.stringify(data);
            if (typeof data === "string")
                data = JSON.parse(data);
        }

        return data;
    }

    /**
     * Toggle hide element status
     */
    function toggleHideStatus() {
        jQuery("body").toggleClass('HBL_ENABLED');
    }

    /**
     * Open setting window
     */
    function openSettingWindow() {
        // load setting popup window
        jQuery("body").append(GM_getResourceText("popup_window"));
    }

    /**
     * Toggle switches of setting
     * @param {String} key keyword|id|length
     * @param {String} contentType post|comment
     */
    function toggleSwitchHandler(key, contentType) {
        config.switch[key][contentType] = !config.switch[key][contentType];
        saveConfig();
    }

    /**
     * Change content length limit
     * @param {String} contentType post|comment
     */
    function changeLengthLimitHandler(contentType) {
        const lengthLimit = window.prompt("請輸入半形正整數，若輸入５將過濾５字內（含５字）內容。");
        if (/^\d+$/.test(lengthLimit) && parseInt(lengthLimit) > 0) {
            config.data.length[contentType] = parseInt(lengthLimit);
            saveConfig();
        } else {
            window.alert("請確認您的輸入，須為半形數字並大於零。");
        }
    }

    /**
     * Handle click event of add values button
     * @param {String} valueType keyword|id
     * @param {String} matchType fullMatch|partMatch
     * @param {String} contentType both|post|comment
     */
    function addValuesHandler(valueType, contentType, matchType) {
        let values = window.prompt("請輸入欲新增的值（不分大小寫，使用空白分隔。）");

        // When canceled prompt, cancel adding.
        if (values == null) return false;

        // Split into arrays by space
        values = values.split(/\s/);

        values.forEach(value => {
            if (valueType === "keyword") {
                addKeywordValidator(matchType, contentType, value);
            } else if (valueType === "id") {
                addIdValidator(contentType, value);
            }
        });
    }

    /**
     * Validate keyword input before add value.
     * @param {String} matchType fullMatch|partMatch
     * @param {String} contentType both|post|comment
     * @param {String} value value ready to add
     */
    function addKeywordValidator(matchType, contentType, value) {
        const configDescription = {
            "fullMatch": {
                "both": {
                    name: "完全符合 - 全域過濾",
                    opposite: ["post", "comment"],
                    partner: null,
                    parent: null
                },
                "post": {
                    name: "完全符合 - 文章過濾",
                    opposite: ["both"],
                    partner: "comment",
                    parent: "both"
                },
                "comment": {
                    name: "完全符合 - 留言過濾",
                    opposite: ["both"],
                    partner: "post",
                    parent: "both"
                }
            },
            "partMatch": {
                "both": {
                    name: "部分符合 - 全域過濾",
                    opposite: ["post", "comment"],
                    partner: null,
                    parent: null
                },
                "post": {
                    name: "部分符合 - 文章過濾",
                    opposite: ["both"],
                    partner: "comment",
                    parent: "both"
                },
                "comment": {
                    name: "部分符合 - 留言過濾",
                    opposite: ["both"],
                    partner: "post",
                    parent: "both"
                }
            }
        };

        // if value is null
        if (value === "") {
            return false;
        }

        // Terminate when value already exists in this list
        if (config.data.keyword[matchType][contentType].includes(encodeURIComponent(value))) {
            window.alert("此清單中已經含有 " + value);
            return false;
        }

        // Prompt when value already exists in opposite list (which means value can't exist in both list at the same time)
        for (const index in configDescription[matchType][contentType].opposite) {
            const oppositeType = configDescription[matchType][contentType].opposite[index];

            if (config.data.keyword[matchType][oppositeType].includes(encodeURIComponent(value))) {
                if (window.confirm(`「${configDescription[matchType][oppositeType].name}」中已經有此關鍵詞，是否從該清單中移除並加到此清單？`)) {
                    // Remove value from opposite list
                    removeKeyword(matchType, oppositeType, value);
                } else {
                    // Terminate when user doesn't want to add to opposite list
                    return false;
                }
            }
        }

        // If partner list have this value, remove and put it to parent list.
        if (configDescription[matchType][contentType].partner && config.data.keyword[matchType][configDescription[matchType][contentType].partner].includes(encodeURIComponent(value))) {
            // Remove value from partner list
            removeKeyword(matchType, configDescription[matchType][contentType].partner, value);
            // Change adding target to parent list
            contentType = configDescription[matchType][contentType].parent;
        }

        addKeyword(matchType, contentType, value);
    }

    /**
     * Add keyword to data and save.
     * @param {String} matchType fullMatch|partMatch
     * @param {String} contentType both|post|comment
     * @param {String} value value ready to add
     */
    function addKeyword(matchType, contentType, value) {
        value = encodeURIComponent(decodeURIComponent(value));
        // Add value to data
        config.data.keyword[matchType][contentType].push(value);
        saveConfig();
    }

    /**
     * Handle remove keyword event from data.
     * @param {String} matchType fullMatch|partMatch
     * @param {String} contentType both|post|comment
     * @param {String} value value ready to add
     */
    function removeKeywordHandler(matchType, contentType, value) {
        if (window.confirm(`確定要刪除關鍵字「${decodeURIComponent(value)}」？`)) {
            removeKeyword(matchType, contentType, value);
        }
    }

    /**
     * Remove keyword from data and save.
     * @param {String} matchType fullMatch|partMatch
     * @param {String} contentType both|post|comment
     * @param {String} value value ready to add
     */
    function removeKeyword(matchType, contentType, value) {
        value = encodeURIComponent(decodeURIComponent(value));
        const valueIndex = config.data.keyword[matchType][contentType].indexOf(value);
        // Remove value from data
        config.data.keyword[matchType][contentType].splice(valueIndex, 1);
        saveConfig();
    }

    /**
     * Validate id input before add value.
     * @param {String} contentType whitelist|blacklist
     * @param {String} value value ready to add
     */
    function addIdValidator(contentType, value) {
        const configDescription = {
            "whitelist": {
                name: "ＩＤ封鎖 - 白名單（強制顯示）",
                opposite: "blacklist",
                partner: null,
                parent: null
            },
            "blacklist": {
                name: "ＩＤ封鎖 - 黑名單（強制隱藏）",
                opposite: "whitelist",
                partner: null,
                parent: null
            }
        };

        // if value is null
        if (value === "") {
            return false;
        }

        // Terminate when value already exists in this list
        if (config.data.id[contentType].includes(encodeURIComponent(value))) {
            window.alert("此清單中已經含有 " + value);
            return false;
        }

        // Prompt when value already exists in opposite list (which means value can't exist in both list at the same time)
        const oppositeType = configDescription[contentType].opposite;

        if (config.data.id[oppositeType].includes(encodeURIComponent(value))) {
            if (window.confirm(`「${configDescription[oppositeType].name}」中已經有此關鍵詞，是否從該清單中移除並加到此清單？`)) {
                // Remove value from opposite list
                removeId(oppositeType, value);
            } else {
                // Terminate when user doesn't want to add to opposite list
                return false;
            }
        }

        addId(contentType, value);
    }

    /**
     * Add id to data and save.
     * @param {String} contentType whitelist|blacklist
     * @param {String} value value ready to add
     */
    function addId(contentType, value) {
        value = encodeURIComponent(decodeURIComponent(value));
        // Add value to data
        config.data.id[contentType].push(value);
        saveConfig();
    }

    /**
     * Remove id from data and save.
     * @param {String} contentType whitelist|blacklist
     * @param {String} value value ready to add
     */
    function removeIdHandler(contentType, value) {
        if (window.confirm(`確定要刪除ＩＤ「${decodeURIComponent(value)}」？`)) {
            removeId(contentType, value);
        }
    }

    /**
     * Remove id from data and save.
     * @param {String} contentType whitelist|blacklist
     * @param {String} value value ready to add
     */
    function removeId(contentType, value) {
        value = encodeURIComponent(decodeURIComponent(value));
        const valueIndex = config.data.id[contentType].indexOf(value);
        // Remove value from data
        config.data.id[contentType].splice(valueIndex, 1);
        saveConfig();
    }

    /**
     * Close setting window
     */
    function closeSettingWindowHandler() {
        jQuery(".HBL.popup").remove();
    }

    /**
     * To initialize setting window, initialize data display and monitors
     */
    function initializeSettingWindow() {
        new Vue({
            el: ".HBL.popup.SW_background",
            data: {
                config: config
            },
            methods: {
                toggleSwitch: toggleSwitchHandler,
                changeLengthLimit: changeLengthLimitHandler,
                addValues: addValuesHandler,
                removeKeyword: removeKeywordHandler,
                removeId: removeIdHandler,
                restoreConfig: restoreConfigHandler,
                resetConfig: resetConfigHandler,
                closeSettingWindow: closeSettingWindowHandler
            }
        });
    }
})(jQuery);