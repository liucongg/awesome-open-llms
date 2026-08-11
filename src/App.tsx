import {
  ArrowRight,
  BookOpen,
  ChevronDown,
  GitFork,
  Menu,
  Moon,
  Search,
  Sun,
  X,
} from "lucide-react";
import {
  type ChangeEvent,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  type WheelEvent as ReactWheelEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import InlineText from "./InlineText";
import {
  allEntries,
  archives,
  type ModelEntry,
  type MonthArchive,
} from "./content";

type Theme = "light" | "dark";
type View = "home" | "read" | "guide" | "contact";

const monthlySpotlight = {
  year: 2026,
  month: 8,
  entryYear: 2026,
  entryMonth: 7,
  title: "DeepSeek-V4-Flash-0731",
  highlights: ["284B 总参数", "13B 激活参数", "最高 1M 上下文"],
};

const routeFromHash = (): View => {
  const hash = window.location.hash;
  if (hash.startsWith("#read")) return "read";
  if (hash === "#guide") return "guide";
  if (hash === "#contact") return "contact";
  return "home";
};

const archiveFromHash = () => {
  const id = window.location.hash.match(/^#read\/(\d{4}-\d{2})$/)?.[1];
  return archives.some((archive) => archive.id === id) ? id : archives[0].id;
};

function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = window.localStorage.getItem("awesome-open-llms-theme");
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "dark" ? "#151210" : "#f7f5ef");
    window.localStorage.setItem("awesome-open-llms-theme", theme);
  }, [theme]);

  return {
    theme,
    toggleTheme: () =>
      setTheme((current) => (current === "light" ? "dark" : "light")),
  };
}

function NavLink({
  active,
  href,
  children,
  onClick,
}: {
  active: boolean;
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <a
      aria-current={active ? "page" : undefined}
      className={active ? "active" : ""}
      href={href}
      onClick={onClick}
    >
      {children}
    </a>
  );
}

function GlobalHeader({
  onQueryChange,
  query,
  theme,
  toggleTheme,
  view,
}: {
  onQueryChange: (value: string) => void;
  query: string;
  theme: Theme;
  toggleTheme: () => void;
  view: View;
}) {
  const searchRef = useRef<HTMLInputElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onShortcut = (event: globalThis.KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onShortcut);
    return () => window.removeEventListener("keydown", onShortcut);
  }, []);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
    if (event.target.value && !window.location.hash.startsWith("#read")) {
      window.location.hash = "read";
    }
  };

  const handleSearchKey = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      onQueryChange("");
      searchRef.current?.blur();
    }
  };

  return (
    <header className="global-header">
      <div className="header-inner">
        <a className="brand" href="#home" aria-label="返回首页">
          <BookOpen size={30} strokeWidth={2.4} />
          <strong>Awesome Open LLMs</strong>
        </a>

        <label className="global-search">
          <Search size={18} />
          <input
            aria-label="搜索模型"
            onChange={handleSearch}
            onKeyDown={handleSearchKey}
            placeholder="搜索模型"
            ref={searchRef}
            type="search"
            value={query}
          />
          {query ? (
            <button
              aria-label="清空搜索"
              onClick={() => onQueryChange("")}
              type="button"
            >
              <X size={16} />
            </button>
          ) : (
            <kbd>⌘ K</kbd>
          )}
        </label>

        <button
          aria-expanded={menuOpen}
          aria-label="打开导航"
          className="menu-button"
          onClick={() => setMenuOpen((current) => !current)}
          type="button"
        >
          <Menu size={21} />
        </button>

        <nav aria-label="主导航" className={menuOpen ? "open" : ""}>
          <NavLink
            active={view === "home"}
            href="#home"
            onClick={() => setMenuOpen(false)}
          >
            首页
          </NavLink>
          <NavLink
            active={view === "read"}
            href="#read"
            onClick={() => setMenuOpen(false)}
          >
            开始阅读
          </NavLink>
          <NavLink
            active={view === "guide"}
            href="#guide"
            onClick={() => setMenuOpen(false)}
          >
            阅读指南
          </NavLink>
          <NavLink
            active={view === "contact"}
            href="#contact"
            onClick={() => setMenuOpen(false)}
          >
            联系作者
          </NavLink>
        </nav>

        <button
          aria-label={`切换到${theme === "light" ? "深色" : "浅色"}模式`}
          className="theme-toggle"
          onClick={toggleTheme}
          type="button"
        >
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        <a
          aria-label="打开 GitHub 项目"
          className="github-link"
          href="https://github.com/liucongg/awesome-open-llms"
          rel="noreferrer"
          target="_blank"
        >
          <GitFork size={20} />
        </a>
      </div>
    </header>
  );
}

function HomePage({ onRead }: { onRead: () => void }) {
  const latest = allEntries.slice(0, 6);
  const spotlightEntry = allEntries.find(
    (entry) =>
      entry.year === monthlySpotlight.entryYear &&
      entry.month === monthlySpotlight.entryMonth &&
      entry.title === monthlySpotlight.title,
  );

  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="hero-main">
          <p className="pixel-label">
            OPEN-SOURCE · UPDATED MONTHLY · 2025—NOW
          </p>
          <h1>
            <span className="hero-title-en">Awesome Open LLMs</span>
            <span className="hero-title-cn">开源模型跟踪</span>
          </h1>
          <p className="hero-description">
            持续整理国内外开源模型，让你轻松定位，发现那些你可能还不知道的宝藏模型，查漏补缺，快速发现模型特点
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#read" onClick={onRead}>
              开始阅读
              <ArrowRight size={22} />
            </a>
            <a className="outline-button" href="#guide">
              查看阅读指南
            </a>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <span className="visual-code">OPEN_</span>
          <div className="model-shard shard-one">
            <span className="shard-plane plane-mint" />
            <span className="shard-plane plane-violet" />
            <span className="shard-plane plane-coral" />
          </div>
          <div className="model-shard shard-two">
            <span className="shard-plane plane-yellow" />
            <span className="shard-plane plane-mint" />
            <span className="shard-plane plane-violet" />
          </div>
          <div className="node-cluster cluster-one">
            <i />
            <i />
            <i />
            <i />
          </div>
          <div className="node-cluster cluster-two">
            <i />
            <i />
            <i />
          </div>
          <span className="speed-lines lines-one" />
          <span className="speed-lines lines-two" />
        </div>
      </section>

      {spotlightEntry && (
        <section className="monthly-feature">
          <div className="section-title">
            <div>
              <p className="pixel-label">MODEL OF THE MONTH</p>
              <h2>本月之最</h2>
            </div>
            <span className="feature-month">
              {monthlySpotlight.year}.
              {String(monthlySpotlight.month).padStart(2, "0")}
            </span>
          </div>

          <a
            className="monthly-feature-card"
            href={`#read/${spotlightEntry.year}-${String(
              spotlightEntry.month,
            ).padStart(2, "0")}`}
          >
            <div className="monthly-feature-copy">
              <span className="feature-badge">本月推荐模型</span>
              <h3>{spotlightEntry.title}</h3>
              <p>
                {spotlightEntry.description.replace(
                  /\[([^\]]+)\]\([^)]+\)/g,
                  "$1",
                )}
              </p>
              <ul aria-label={`${spotlightEntry.title} 核心特点`}>
                {monthlySpotlight.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
              <span className="feature-link">
                查看完整收录
                <ArrowRight size={20} />
              </span>
            </div>
            <div className="monthly-feature-image">
              <img
                alt={`${spotlightEntry.title} 模型页面截图`}
                src={spotlightEntry.image}
              />
              <span>MONTHLY PICK · 01</span>
            </div>
          </a>
        </section>
      )}

      <section className="latest-section">
        <div className="section-title">
          <div>
            <p className="pixel-label">LATEST UPDATES</p>
            <h2>最近收录</h2>
          </div>
          <a href="#read">
            查看全部
            <ArrowRight size={18} />
          </a>
        </div>
        <div className="latest-grid">
          {latest.map((entry, index) => (
            <a
              className="latest-card"
              href={`#read/${entry.year}-${String(entry.month).padStart(2, "0")}`}
              key={entry.id}
            >
              <span className="latest-index">
                {String(index + 1).padStart(2, "0")}
              </span>
              <time>
                {entry.releaseYear}.
                {String(entry.releaseMonth).padStart(2, "0")}.
                {String(entry.day).padStart(2, "0")}
              </time>
              <h3>{entry.title}</h3>
              <p>{entry.description.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")}</p>
              <ArrowRight className="latest-arrow" size={20} />
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}

function MonthNavigation({
  currentArchive,
  introActive,
  onSelectIntro,
  onSelect,
}: {
  currentArchive: MonthArchive;
  introActive: boolean;
  onSelectIntro: () => void;
  onSelect: (archive: MonthArchive) => void;
}) {
  const grouped = archives.reduce<Record<number, MonthArchive[]>>(
    (result, archive) => {
      result[archive.year] ??= [];
      result[archive.year].push(archive);
      return result;
    },
    {},
  );
  const sortedGroups = Object.entries(grouped).sort(
    ([yearA], [yearB]) => Number(yearB) - Number(yearA),
  );
  const [expandedYears, setExpandedYears] = useState<Record<string, boolean>>(
    () => Object.fromEntries(sortedGroups.map(([year]) => [year, true])),
  );

  return (
    <aside className="month-navigation" aria-label="月份导航">
      <button
        aria-current={introActive ? "page" : undefined}
        className={`sidebar-overview ${introActive ? "active" : ""}`}
        onClick={onSelectIntro}
        type="button"
      >
        <span />
        导读
      </button>
      {sortedGroups.map(([year, yearArchives]) => {
        const expanded = expandedYears[year];
        return (
          <section key={year}>
            <button
              aria-expanded={expanded}
              className="year-toggle"
              onClick={() =>
                setExpandedYears((current) => ({
                  ...current,
                  [year]: !current[year],
                }))
              }
              type="button"
            >
              <h2>{year} 年</h2>
              <ChevronDown
                className={expanded ? "expanded" : ""}
                size={18}
              />
            </button>
            <div className="year-months" hidden={!expanded}>
              {yearArchives.map((archive) => (
                <button
                  aria-current={
                    !introActive && archive.id === currentArchive.id
                      ? "page"
                      : undefined
                  }
                  className={`month-link ${
                    !introActive && archive.id === currentArchive.id
                      ? "active"
                      : ""
                  }`}
                  key={archive.id}
                  onClick={() => onSelect(archive)}
                  type="button"
                >
                  <span>{archive.month} 月</span>
                  <small>{archive.entries.length}</small>
                </button>
              ))}
            </div>
          </section>
        );
      })}
    </aside>
  );
}

const clampZoom = (value: number) => Math.min(4, Math.max(0.5, value));

function ImageLightbox({
  alt,
  onClose,
  src,
}: {
  alt: string;
  onClose: () => void;
  src: string;
}) {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const dragStart = useRef<{
    pointerX: number;
    pointerY: number;
    positionX: number;
    positionY: number;
  } | null>(null);
  const pinchStart = useRef<{ distance: number; scale: number } | null>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "0") {
        setScale(1);
        setPosition({ x: 0, y: 0 });
      }
      if (event.key === "+" || event.key === "=") {
        setScale((current) => clampZoom(current + 0.2));
      }
      if (event.key === "-") {
        setScale((current) => clampZoom(current - 0.2));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const resetView = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleWheel = (event: ReactWheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    const factor = event.deltaY < 0 ? 1.12 : 0.88;
    setScale((current) => clampZoom(current * factor));
  };

  const handlePointerDown = (
    event: ReactPointerEvent<HTMLDivElement>,
  ) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    pointers.current.set(event.pointerId, {
      x: event.clientX,
      y: event.clientY,
    });

    if (pointers.current.size === 1) {
      dragStart.current = {
        pointerX: event.clientX,
        pointerY: event.clientY,
        positionX: position.x,
        positionY: position.y,
      };
    } else if (pointers.current.size === 2) {
      const [first, second] = Array.from(pointers.current.values());
      pinchStart.current = {
        distance: Math.hypot(second.x - first.x, second.y - first.y),
        scale,
      };
      dragStart.current = null;
    }
  };

  const handlePointerMove = (
    event: ReactPointerEvent<HTMLDivElement>,
  ) => {
    if (!pointers.current.has(event.pointerId)) return;
    pointers.current.set(event.pointerId, {
      x: event.clientX,
      y: event.clientY,
    });

    if (pointers.current.size === 2 && pinchStart.current) {
      const [first, second] = Array.from(pointers.current.values());
      const distance = Math.hypot(
        second.x - first.x,
        second.y - first.y,
      );
      setScale(
        clampZoom(
          pinchStart.current.scale * (distance / pinchStart.current.distance),
        ),
      );
      return;
    }

    if (pointers.current.size === 1 && dragStart.current) {
      setPosition({
        x:
          dragStart.current.positionX +
          event.clientX -
          dragStart.current.pointerX,
        y:
          dragStart.current.positionY +
          event.clientY -
          dragStart.current.pointerY,
      });
    }
  };

  const handlePointerEnd = (
    event: ReactPointerEvent<HTMLDivElement>,
  ) => {
    pointers.current.delete(event.pointerId);
    pinchStart.current = null;

    const remainingPointer = Array.from(pointers.current.values())[0];
    dragStart.current = remainingPointer
      ? {
          pointerX: remainingPointer.x,
          pointerY: remainingPointer.y,
          positionX: position.x,
          positionY: position.y,
        }
      : null;
  };

  const toggleZoom = () => {
    if (scale > 1) {
      resetView();
    } else {
      setScale(2);
    }
  };

  return (
    <div
      aria-label={`${alt} 图片预览`}
      aria-modal="true"
      className="image-lightbox"
      role="dialog"
    >
      <button
        aria-label="关闭图片预览"
        className="lightbox-close"
        onClick={onClose}
        ref={closeButtonRef}
        type="button"
      >
        <X size={27} />
      </button>

      <div
        aria-label="拖拽移动图片，滚轮或双指缩放，双击切换缩放"
        className={`lightbox-stage ${pointers.current.size ? "dragging" : ""}`}
        onDoubleClick={toggleZoom}
        onPointerCancel={handlePointerEnd}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onWheel={handleWheel}
      >
        <img
          alt={alt}
          draggable={false}
          src={src}
          style={{
            transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${scale})`,
          }}
        />
      </div>

      <div className="lightbox-toolbar">
        <button onClick={resetView} type="button">
          {Math.round(scale * 100)}%
        </button>
        <span>滚轮 / 双指缩放 · 拖拽查看</span>
        <kbd>ESC</kbd>
        <button onClick={onClose} type="button">
          关闭
        </button>
      </div>
    </div>
  );
}

function ModelArticle({ entry }: { entry: ModelEntry }) {
  const date = `${String(entry.releaseMonth).padStart(2, "0")}.${String(entry.day).padStart(2, "0")}`;
  const [imageOpen, setImageOpen] = useState(false);

  return (
    <section className="model-article" id={entry.id}>
      <div className="model-heading">
        <time
          dateTime={`${entry.releaseYear}-${entry.releaseMonth}-${entry.day}`}
        >
          {date}
        </time>
        <h2>{entry.title}</h2>
      </div>
      <p>
        <InlineText text={entry.description} />
      </p>
      {entry.image && (
        <>
          <button
            aria-label={`放大查看 ${entry.title} 模型截图`}
            className="article-image"
            onClick={() => setImageOpen(true)}
            type="button"
          >
            <img
              alt={`${entry.title} 模型截图`}
              loading="lazy"
              src={entry.image}
            />
            <span>点击放大</span>
          </button>
          {imageOpen && (
            <ImageLightbox
              alt={`${entry.title} 模型截图`}
              onClose={() => setImageOpen(false)}
              src={entry.image}
            />
          )}
        </>
      )}
    </section>
  );
}

function SearchResults({
  onSelect,
  results,
}: {
  onSelect: (entry: ModelEntry) => void;
  results: ModelEntry[];
}) {
  return (
    <article className="document-main search-results">
      <p className="pixel-label">SEARCH RESULTS</p>
      <h1>搜索结果</h1>
      <p className="document-lead">共找到 {results.length} 条相关记录。</p>
      <div className="result-list">
        {results.map((entry) => (
          <button
            key={entry.id}
            onClick={() => onSelect(entry)}
            type="button"
          >
            <time>
              {entry.releaseYear}.
              {String(entry.releaseMonth).padStart(2, "0")}.
              {String(entry.day).padStart(2, "0")}
            </time>
            <span>
              <strong>{entry.title}</strong>
              <small>
                {entry.description.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")}
              </small>
            </span>
            <ArrowRight size={19} />
          </button>
        ))}
      </div>
    </article>
  );
}

function ReadingIntroduction() {
  return (
    <article className="document-main reading-introduction">
      <p className="pixel-label">START HERE</p>
      <h1>开源模型月度档案导读</h1>
      <div className="title-mark" />
      <p className="document-lead">
        这是一份持续更新的开源模型中文档案。内容按年份和月份整理，
        帮助你快速定位模型、理解主要特点，并发现可能错过的开源项目。
      </p>

      <div className="chapter-heading" id="intro-how">
        <span />
        <h2>如何阅读</h2>
      </div>
      <div className="intro-steps">
        <section>
          <small>01</small>
          <h3>从月份进入</h3>
          <p>在左侧展开年份，选择月份即可查看当月收录的全部模型。</p>
        </section>
        <section>
          <small>02</small>
          <h3>按时间浏览</h3>
          <p>每个月内部按发布日期从新到旧排列，最近发布的内容优先出现。</p>
        </section>
        <section>
          <small>03</small>
          <h3>直接搜索</h3>
          <p>顶部搜索支持模型名称、发布机构、参数规模和技术关键词。</p>
        </section>
      </div>

      <div className="chapter-heading" id="intro-scope">
        <span />
        <h2>收录范围</h2>
      </div>
      <p className="intro-copy">
        主要收录国内外公开发布的开源语言模型、多模态模型、语音与视觉模型，
        也会包含重要的模型框架、数据集和配套工具。每条记录保留核心信息与原始截图，
        方便快速了解模型定位。
      </p>
    </article>
  );
}

function ReadingPage({
  currentArchive,
  introActive,
  onSelectArchive,
  onSelectEntry,
  onSelectIntro,
  query,
}: {
  currentArchive: MonthArchive;
  introActive: boolean;
  onSelectArchive: (archive: MonthArchive) => void;
  onSelectEntry: (entry: ModelEntry) => void;
  onSelectIntro: () => void;
  query: string;
}) {
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const searchResults = useMemo(
    () =>
      normalizedQuery
        ? allEntries.filter((entry) =>
            `${entry.title} ${entry.description}`
              .toLocaleLowerCase()
              .includes(normalizedQuery),
          )
        : [],
    [normalizedQuery],
  );

  return (
    <main className="reading-page">
      <MonthNavigation
        currentArchive={currentArchive}
        introActive={introActive}
        onSelect={onSelectArchive}
        onSelectIntro={onSelectIntro}
      />

      {normalizedQuery ? (
        <SearchResults onSelect={onSelectEntry} results={searchResults} />
      ) : introActive ? (
        <ReadingIntroduction />
      ) : (
        <article className="document-main">
          <p className="pixel-label">OPEN MODEL ARCHIVE</p>
          <h1>{currentArchive.label}开源模型</h1>
          <div className="title-mark" />
          <p className="document-lead">
            本月共收录 {currentArchive.entries.length} 条开源模型与相关项目，
            按发布日期从新到旧排列。点击截图可查看原图。
          </p>
          <div className="chapter-heading">
            <span />
            <h2>本月模型</h2>
          </div>
          <div className="model-articles">
            {currentArchive.entries.map((entry) => (
              <ModelArticle entry={entry} key={entry.id} />
            ))}
          </div>
        </article>
      )}

      <aside className="page-toc" aria-label="本月目录">
        <strong>
          {normalizedQuery ? "搜索说明" : introActive ? "导读目录" : "本月目录"}
        </strong>
        {normalizedQuery ? (
          <p>结果覆盖全部月份，选择条目即可进入对应月份。</p>
        ) : introActive ? (
          <nav className="intro-toc">
            <span>这份档案是什么</span>
            <span>如何阅读</span>
            <span>收录范围</span>
          </nav>
        ) : (
          <nav>
            {currentArchive.entries.map((entry) => (
              <a href={`#${entry.id}`} key={entry.id}>
                {entry.title}
              </a>
            ))}
          </nav>
        )}
      </aside>
    </main>
  );
}

function GuidePage() {
  return (
    <main className="simple-page">
      <p className="pixel-label">READING GUIDE</p>
      <h1>怎样使用这份月度档案</h1>
      <div className="title-mark" />
      <div className="guide-grid">
        <section>
          <span>01</span>
          <h2>先读导读</h2>
          <p>进入“开始阅读”后，先用一分钟了解档案的内容范围和浏览方式。</p>
        </section>
        <section>
          <span>02</span>
          <h2>按年份和月份切换</h2>
          <p>左侧年份可以收起或展开，选择月份后即可查看当月的全部记录。</p>
        </section>
        <section>
          <span>03</span>
          <h2>直接搜索关键词</h2>
          <p>可以搜索模型名称、发布机构、参数规模或技术关键词。</p>
        </section>
      </div>
    </main>
  );
}

function ContactPage() {
  return (
    <main className="simple-page contact-page">
      <p className="pixel-label">KEEP IT OPEN</p>
      <h1>发现遗漏，欢迎一起补全</h1>
      <div className="title-mark" />
      <p className="document-lead">
        如果你发现值得收录的模型、信息错误或更好的资料，可以通过 GitHub
        联系作者。
      </p>
      <div className="contact-links">
        <a
          href="https://github.com/liucongg"
          rel="noreferrer"
          target="_blank"
        >
          <GitFork size={24} />
          <span>
            <small>联系作者</small>
            <strong>@liucongg</strong>
          </span>
          <ArrowRight size={21} />
        </a>
        <a
          href="https://github.com/liucongg/awesome-open-llms/issues"
          rel="noreferrer"
          target="_blank"
        >
          <BookOpen size={24} />
          <span>
            <small>提供线索</small>
            <strong>提交 Issue</strong>
          </span>
          <ArrowRight size={21} />
        </a>
      </div>
    </main>
  );
}

function App() {
  const { theme, toggleTheme } = useTheme();
  const [view, setView] = useState<View>(routeFromHash);
  const [query, setQuery] = useState("");
  const [selectedArchiveId, setSelectedArchiveId] = useState(archiveFromHash);
  const [readingIntroActive, setReadingIntroActive] = useState(
    () => window.location.hash === "#read",
  );

  useEffect(() => {
    const onHashChange = () => {
      setView(routeFromHash());
      if (window.location.hash.startsWith("#read/")) {
        setSelectedArchiveId(archiveFromHash());
        setReadingIntroActive(false);
      } else if (window.location.hash === "#read") {
        setReadingIntroActive(true);
      }
      window.scrollTo({ top: 0 });
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const currentArchive =
    archives.find((archive) => archive.id === selectedArchiveId) ?? archives[0];

  const selectArchive = (archive: MonthArchive) => {
    setSelectedArchiveId(archive.id);
    setReadingIntroActive(false);
    setQuery("");
    window.history.replaceState(null, "", `#read/${archive.id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const selectReadingIntro = () => {
    setReadingIntroActive(true);
    setQuery("");
    window.history.replaceState(null, "", "#read");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const selectEntry = (entry: ModelEntry) => {
    const archive = archives.find(
      (item) => item.year === entry.year && item.month === entry.month,
    );
    if (!archive) return;
    setQuery("");
    setSelectedArchiveId(archive.id);
    setReadingIntroActive(false);
    window.history.replaceState(null, "", `#read/${archive.id}`);
    requestAnimationFrame(() =>
      document.getElementById(entry.id)?.scrollIntoView({ behavior: "smooth" }),
    );
  };

  return (
    <div className="site-shell">
      <GlobalHeader
        onQueryChange={setQuery}
        query={query}
        theme={theme}
        toggleTheme={toggleTheme}
        view={view}
      />
      {view === "home" && <HomePage onRead={() => setQuery("")} />}
      {view === "read" && (
        <ReadingPage
          currentArchive={currentArchive}
          introActive={readingIntroActive}
          onSelectArchive={selectArchive}
          onSelectEntry={selectEntry}
          onSelectIntro={selectReadingIntro}
          query={query}
        />
      )}
      {view === "guide" && <GuidePage />}
      {view === "contact" && <ContactPage />}
    </div>
  );
}

export default App;
