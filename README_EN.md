<div align="center">
  <img src="./public/og.png" alt="Awesome Open LLMs cover" width="100%" />

  <h1>Awesome Open LLMs · Open Model Tracker</h1>

  <p>
    <a href="./README.md">简体中文</a> ·
    <a href="./README_EN.md">English</a> ·
    <a href="https://awesome-open-llms.logcongcong.workers.dev/">Read Online</a> ·
  </p>
</div>

---

Awesome Open LLMs is a continuously updated Chinese-language archive of open-source models, organized by year and month. It tracks model names, organizations, parameter sizes, capabilities, technical highlights, and original screenshots in reverse chronological order.

The archive currently covers **June 2025 through August 2026** and will continue to grow with monthly updates.

## Highlights

- **Monthly archives:** Browse models by year and month, with the newest releases shown first.
- **Model of the month:** One notable open-source model is highlighted every month.
- **Full-text search:** Search by model name, organization, parameter size, or technical keyword.
- **Image viewer:** Open screenshots in a full-screen viewer with wheel, pinch, and drag controls.
- **Responsive interface:** Designed for desktop, tablet, and mobile screens.
- **Light and dark themes:** Switch themes manually and save the preference on the current device.

## Monthly Archives

### 2026

- [August 2026](./docs/2026/08.md)
- [July 2026](./docs/2026/07.md)
- [June 2026](./docs/2026/06.md)
- [May 2026](./docs/2026/05.md)
- [April 2026](./docs/2026/04.md)
- [March 2026](./docs/2026/03.md)
- [February 2026](./docs/2026/02.md)
- [January 2026](./docs/2026/01.md)

### 2025

- [December 2025](./docs/2025/12.md)
- [November 2025](./docs/2025/11.md)
- [October 2025](./docs/2025/10.md)
- [September 2025](./docs/2025/09.md)
- [August 2025](./docs/2025/08.md)
- [July 2025](./docs/2025/07.md)
- [June 2025](./docs/2025/06.md)

## Repository Structure

```text
awesome-open-llms/
├── docs/                 # Monthly Markdown archives
│   ├── 2025/
│   └── 2026/
├── public/
│   ├── assets/           # Model screenshots and contact image
│   ├── _headers          # Cloudflare Pages headers
│   └── og.png            # Social preview image
├── src/
│   ├── App.tsx           # Page structure and interactions
│   ├── content.ts        # Monthly content parser
│   └── styles.css        # Website styles
├── index.html
└── package.json
```

The website automatically reads Markdown files under `docs/` and generates the month navigation, model entries, and search index.

## Contributing

If you find a model that should be included, an incorrect detail, a broken link, or a better source, you are welcome to:

- [Open an issue](https://github.com/liucongg/awesome-open-llms/issues)
- Submit a pull request
- Contact [@liucongg](https://github.com/liucongg)

Please include the model name, release date, organization, official project link, core highlights, and screenshot source whenever possible.

## Contact the Author

This project is curated and maintained by **刘聪 NLP**. Suggestions are welcome through GitHub.

<a href="./public/assets/contact/liucong-nlp.png">
  <img src="./public/assets/contact/liucong-nlp.png" alt="Search 刘聪NLP on WeChat" width="760" />
</a>

## Disclaimer

This is a community-maintained archive and is not affiliated with any model vendor or publishing organization.

For time-sensitive information such as capabilities, parameters, licensing, availability, and safety policies, refer to the official repository, technical report, and announcement.

Screenshots, product names, and trademarks belong to their respective owners and are included only for documentation, learning, and research.

## License

Licensed under the [Apache License 2.0](./LICENSE).
