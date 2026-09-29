<div align="center">
  <img src="./public/og.png" alt="Awesome Open LLMs 封面" width="100%" />

  <h1>Awesome Open LLMs · 开源模型追踪</h1>

  <p>
    <a href="./README.md">简体中文</a> ·
    <a href="./README_EN.md">English</a> ·
    <a href="https://awesome-open-llms.logcongcong.workers.dev/">在线阅读</a> ·
  </p>
</div>

---

Awesome Open LLMs 是一个按月份持续更新的开源模型中文档案。项目记录模型名称、发布机构、参数规模、能力方向、技术特点和原始截图，并以时间倒序组织内容，方便快速了解近期值得关注的开源模型。

当前归档覆盖 **2025 年 6 月至 2026 年 9 月**，后续将继续按月更新。

## 项目特点

- **按月归档**：以年份和月份组织内容，最近发布的模型优先展示。
- **本月之最**：每月选择一个值得重点关注的开源模型。
- **全文搜索**：支持按模型名称、发布机构、参数规模和技术关键词搜索。
- **图片预览**：点击截图进入全屏模式，支持滚轮、双指缩放和拖拽查看。
- **响应式布局**：适配桌面端、平板和手机。
- **亮暗主题**：支持手动切换，并保存当前设备的主题偏好。

## 月度归档

### 2026

- [2026 年 9 月](./docs/2026/09.md)
- [2026 年 8 月](./docs/2026/08.md)
- [2026 年 7 月](./docs/2026/07.md)
- [2026 年 6 月](./docs/2026/06.md)
- [2026 年 5 月](./docs/2026/05.md)
- [2026 年 4 月](./docs/2026/04.md)
- [2026 年 3 月](./docs/2026/03.md)
- [2026 年 2 月](./docs/2026/02.md)
- [2026 年 1 月](./docs/2026/01.md)

### 2025

- [2025 年 12 月](./docs/2025/12.md)
- [2025 年 11 月](./docs/2025/11.md)
- [2025 年 10 月](./docs/2025/10.md)
- [2025 年 9 月](./docs/2025/09.md)
- [2025 年 8 月](./docs/2025/08.md)
- [2025 年 7 月](./docs/2025/07.md)
- [2025 年 6 月](./docs/2025/06.md)


## 项目结构

```text
awesome-open-llms/
├── docs/                 # 按年份、月份整理的 Markdown 内容
│   ├── 2025/
│   └── 2026/
├── public/
│   ├── assets/           # 月度模型截图与联系作者图片
│   ├── _headers          # Cloudflare Pages 响应头配置
│   └── og.png            # 项目分享预览图
├── src/
│   ├── App.tsx           # 页面结构与交互
│   ├── content.ts        # 月度内容解析
│   └── styles.css        # 网站样式
├── index.html
└── package.json
```

网站会自动读取 `docs/` 目录中的 Markdown 文件并生成月份导航、模型列表和搜索数据。


## 参与贡献

如果你发现值得收录的开源模型、信息错误、失效链接或更准确的资料，欢迎：

- [提交 Issue](https://github.com/liucongg/awesome-open-llms/issues)
- 提交 Pull Request
- 联系作者 [@liucongg](https://github.com/liucongg)

提交内容时，请尽量提供模型名称、发布日期、发布机构、官方项目链接、核心特点和截图来源。

## 联系作者

本项目由 **刘聪 NLP** 整理和维护。欢迎通过 GitHub 提交建议。

<a href="./public/assets/contact/liucong-nlp.png">
  <img src="./public/assets/contact/liucong-nlp.png" alt="微信搜索刘聪NLP" width="760" />
</a>

## 声明

本项目是社区维护的开源模型信息档案，不代表任何模型厂商或发布机构。

涉及模型功能、参数、许可协议、可用范围和安全策略等时效性信息时，请以模型官方仓库、技术报告和正式公告为准。

项目中的截图、名称和商标归各自权利人所有，仅用于信息整理、学习与研究。如有内容需要更正或移除，请通过 [Issue](https://github.com/liucongg/awesome-open-llms/issues) 联系。

## 开源协议

本项目采用 [Apache License 2.0](./LICENSE)。
