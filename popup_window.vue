<div class="HBL popup SW_background">
    <div class="HBL SW_case">
        <div class="HBL SW_header">文章過濾器設定</div>
        <div class="HBL SW_content">

            <div class="HBL SW_outerbox">
                <span class="HBL SW_title">過濾設定</span>
                <span class="HBL SW_row">
                    <div :key="key" class="HBL SW_item" v-for="(data, key) in config.switch">
                        <span class="HBL SW_title">{{ data.name }}</span>
                        <div :class="{ SW_on: data.post }" class="HBL SW_switch">
                            <span>文章過濾：{{ data.post ? "開" : "關" }}</span>
                            <button @click="toggleSwitch(key, 'post')">切換</button>
                        </div>
                        <div :class="{ SW_on: data.comment }" class="HBL SW_switch">
                            <span>留言過濾：{{ data.comment ? "開" : "關" }}</span>
                            <button @click="toggleSwitch(key, 'comment')">切換</button>
                        </div>
                    </div>
                    <div class="HBL SW_item">
                        <span class="HBL SW_title">設定過濾字數</span>
                        <div class="HBL">
                            <span>文章過濾：{{ config.data.length.post }}</span>
                            <button @click="changeLengthLimit('post')">變更</button>
                        </div>
                        <div class="HBL">
                            <span>留言過濾：{{ config.data.length.comment }}</span>
                            <button @click="changeLengthLimit('comment')">變更</button>
                        </div>
                    </div>
                </span>
            </div>

            <div :key="matchType" class="HBL SW_outerbox" v-for="(data, matchType) in config.data.keyword">
                <span class="HBL SW_title">{{ data.name }}</span>
                <div class="noborder">
                    當設定在全域變數中，下方就不需再設定同樣的字詞（系統會提醒已在全域過濾清單中有）。
                    <br>當文章與留言都有相同的變數，會自動改到全域變數中。
                    <br>不分大小寫。
                </div>
                <div class="HBL SW_item">
                    <span class="HBL SW_title">全域過濾關鍵詞（文章與留言皆會過濾）</span>
                    <span>
                        <button @click="addValues('keyword', 'both', matchType)">新增</button>
                    </span>
                    <div class="HBL SW_row noborder">
                        <div :key="keyword" @click="removeKeyword(matchType, 'both', keyword)" v-for="keyword in data.both">{{ decodeURIComponent(keyword) }}</div>
                    </div>
                </div>
                <span class="HBL SW_row equalsplit">
                    <div class="HBL SW_item">
                        <span class="HBL SW_title">文章過濾關鍵詞</span>
                        <span>
                            <button @click="addValues('keyword', 'post', matchType)">新增</button>
                        </span>
                        <div class="HBL SW_row noborder">
                            <div :key="keyword" @click="removeKeyword(matchType, 'post', keyword)" v-for="keyword in data.post">{{ decodeURIComponent(keyword) }}</div>
                        </div>
                    </div>
                    <div class="HBL SW_item">
                        <span class="HBL SW_title">留言過濾關鍵詞</span>
                        <span>
                            <button @click="addValues('keyword', 'comment', matchType)">新增</button>
                        </span>
                        <div class="HBL SW_row noborder">
                            <div :key="keyword" @click="removeKeyword(matchType, 'comment', keyword)" v-for="keyword in data.comment">{{ decodeURIComponent(keyword) }}</div>
                        </div>
                    </div>
                </span>
            </div>

            <div class="HBL SW_outerbox">
                <span class="HBL SW_title">ＩＤ封鎖</span>
                <div class="noborder">
                    黑名單會自動獲取已經被黑名單的列表，但若要手動添加，可於下方參數進行添加。
                    <br>可以添加強制顯示、強制隱藏，這兩個參數會優先於黑名單列表。
                    <br>ＩＤ只能在強制顯示與強制隱藏其中一個清單內，不會有重複（輸入時會被提醒）。
                    <br>輸入的ＩＤ不分大小寫。
                </div>
                <span class="HBL SW_row equalsplit">
                    <div class="HBL SW_item">
                        <span class="HBL SW_title">顯示名單</span>
                        <span>
                            <button @click="addValues('id', 'whitelist')">新增</button>
                        </span>
                        <div class="HBL SW_row noborder">
                            <div :key="id" @click="removeId('whitelist', id)" v-for="id in config.data.id.whitelist">{{ id }}</div>
                        </div>
                    </div>
                    <div class="HBL SW_item">
                        <span class="HBL SW_title">隱藏名單</span>
                        <span>
                            <button @click="addValues('id', 'blacklist')">新增</button>
                        </span>
                        <div class="HBL SW_row noborder">
                            <div :key="id" @click="removeId('blacklist', id)" v-for="id in config.data.id.blacklist">{{ id }}</div>
                        </div>
                    </div>
                </span>
            </div>

            <div class="HBL SW_outerbox">
                <span class="HBL SW_title">其他設定</span>
                <div class="HBL SW_item manualBackup">
                    <span class="HBL">手動備份：</span>
                    <input :value="JSON.stringify(config)" readonly type="text">
                </div>
                <div class="HBL SW_item manualRestore">
                    <span class="HBL">還原備份：</span>
                    <input type="text">
                    <button @click="restoreConfig">還原</button>
                </div>
                <div class="HBL SW_item resetSetting">
                    <span class="HBL">還原初始設定：</span>
                    <button @click="resetConfig">還原</button>
                </div>
            </div>

        </div>
        <div class="HBL SW_footer">
            <button @click="closeSettingWindow" class="HBL close">完成</button>
        </div>
    </div>
</div>

<style class="HBL popup">
    .HBL.SW_background {
        /* position */
        position: fixed;
        top: 35px;
        bottom: 0px;
        left: 0px;
        right: 0px;

        /* display */
        background-color: rgba(0, 0, 0, 0.5);

        /* content */
        display: flex;
        align-items: center;
        justify-content: center;

        /* index */
        z-index: 95;
    }

    .HBL.SW_case {
        /* size */
        width: 80%;
        max-height: 90%;

        /* border */
        border: 1px solid #a7c7c8;
        border-radius: 10px;

        /* display */
        background-color: white;
        box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.25);

        /* content */
        display: flex;
        flex-flow: column;
        word-break: break-all;
        overflow: hidden;
        line-height: normal;
        text-align: center;
        font-family: Microsoft JhengHei, LiHei Pro, sans-serif;
    }

    .HBL.SW_header {
        /* border */
        border-bottom: 1px solid;

        /* display */
        background-color: #E5F7F8;
        padding: 5px;

        /* content */
        color: #484b4b;
        font-size: 150%;
    }

    .HBL.SW_content {
        overflow: auto;
        padding: 10px;
    }

    .HBL.SW_content div {
        padding: 10px;
        border: 1px solid;
        border-radius: 10px;
        margin: 10px;
    }

    .HBL.SW_title {
        font-size: 125%;
    }

    .HBL.SW_content .HBL.SW_outerbox {
        background-color: antiquewhite;
    }

    .HBL.SW_content .HBL.SW_item {
        background-color: beige;
    }

    .HBL.SW_content .HBL.SW_switch:not(.SW_on) {
        color: crimson;
    }

    .HBL.SW_content .HBL.SW_switch.SW_on {
        color: olive;
    }

    .HBL.SW_footer {
        /* border */
        border-top: 1px solid;

        /* display */
        background-color: #E5F7F8;
        padding: 5px;
    }

    .HBL.SW_row {
        display: flex;
        flex-flow: row wrap;
        justify-content: center;
    }

    .HBL.SW_item .SW_row > *:before {
        color: crimson;
        content: "X ";
    }

    .HBL.SW_item .SW_row > * {
        cursor: pointer;
    }

    .HBL label {
        padding: 10px;
    }

    .noborder {
        border: none !important;
    }

    .equalsplit > * {
        flex: 1;
    }
</style>

<script class="HBL popup">jQuery("#HBL_popup_window_loaded_listener").click()</script>