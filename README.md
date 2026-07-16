# 怦然心动 · 英语学习 APP

基于电影《怦然心动》(Flipped) 字幕的英语学习 PWA。逐句提供：英文、中文、音标、重点解析、同义替换、语境串联、可套用母句模板。

> **当前主力录入方式：在豆包查，把结果粘贴回 APP（详见下方「使用流程」）。**
> 不再依赖 APP 内联网调用翻译接口，彻底避开网络/跨域拦截问题。

## 目录结构

```
flipped-english/
├── index.html      # 单文件应用（结构 + 样式 + 逻辑）
├── data.js         # 字幕数据（约 1000+ 条，{cn,en,phonetic,keyPoints,alts,context,motherPattern}）
├── sw.js           # Service Worker（PWA 离线缓存，不缓存 index.html，刷新即最新）
├── manifest.json   # PWA 清单
└── README.md
```

## 本地运行

任选其一（需静态服务器，不能用 file:// 直接打开，否则 Service Worker / fetch 受限）：

```bash
# 方式一：Python（Mac/Linux 自带，Windows 用 py）
python3 -m http.server 8080
# 或 Windows: py -m http.server 8080

# 方式二：Node
npx serve .
```

然后浏览器打开 `http://localhost:8080/`。

## 使用流程（粘贴豆包结果）

1. 打开 APP，翻到要学的句子。
2. 点 **📋 粘贴豆包结果** → 弹窗里点 **📋 复制提问模板**。
3. 把模板发给豆包（doubao），复制豆包整段回复。
4. 粘贴回弹窗文本框 → 点 **✅ 解析并应用**。
5. APP 自动把中英文/音标/重点解析/同义替换/语境/母句模板写入当前句并**同步云端**。

支持两种豆包回复格式，解析器都能识别：
- **JSON 格式**：`{"en":"...","cn":"...","phonetic":"...","keyPoints":[...],"alts":[...],"context":"...","motherPattern":"..."}`
- **标签文字格式**：`中文翻译：…\n英文：…\n音标：…\n重点解析：…\n同义：…\n语境：…\n母句：…`

## 云端同步（跨设备共享你的录入）

翻译结果通过 jsonbin.io 同步，多设备登录同一账号即可共享。

配置位置：APP 内 ⚙️ 设置 → 填写以下两项（与 `index.html` 顶部的 `CLOUD_BIN_ID` / `CLOUD_API_KEY` 对应）：
- `CLOUD_BIN_ID`：你的 jsonbin bin id
- `CLOUD_API_KEY`：jsonbin Master Key（X-Master-Key）

> 未配置或离线时，结果自动存本机 localStorage，下次联网再同步。

## 部署

纯静态站点，可部署到任意静态托管：CloudStudio、GitHub Pages、Vercel、Netlify 等。
- CloudStudio：上传本目录，`index.html` 为入口。
- GitHub Pages：推到仓库后开启 Pages（根目录 / main 分支）。

## 跨设备协作（Git）

本项目用 Git 管理。换电脑时：

```bash
git clone <你的仓库地址>
cd flipped-english
# 本地运行见上
```

修改后：`git add -A && git commit -m "..." && git push`。

## 说明

- `index.html` 中保留了早期的「自动 AI 翻译」弹窗代码（旧 `aiModalOverlay` / `openAITranslate` 等），目前主按钮已改为豆包粘贴入口，旧弹窗为孤立代码、不影响使用。如需精简可后续移除（注意 `aiDirection` 在合并逻辑中仍有引用，移除需同步处理）。
- Service Worker 版本号在 `sw.js` 顶部，改版后建议递增以触发更新。
