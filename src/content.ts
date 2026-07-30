export type ModelEntry = {
  id: string;
  year: number;
  month: number;
  day: number;
  title: string;
  description: string;
  image: string;
};

export type MonthArchive = {
  id: string;
  year: number;
  month: number;
  label: string;
  entries: ModelEntry[];
};

const rawDocuments = import.meta.glob("/docs/**/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const bulletPattern = /^- \*\*(\d{2})-(\d{2}) · (.+?)\*\* — (.+)$/;
const imagePattern = /^\s*!\[.*?\]\((.+?)\)$/;

function parseDocument(path: string, raw: string): MonthArchive {
  const pathMatch = path.match(/\/docs\/(\d{4})\/(\d{2})\.md$/);
  if (!pathMatch) {
    throw new Error(`无法识别月度文件路径：${path}`);
  }

  const year = Number(pathMatch[1]);
  const month = Number(pathMatch[2]);
  const lines = raw.split(/\r?\n/);
  const entries: ModelEntry[] = [];

  for (let index = 0; index < lines.length; index += 1) {
    const bullet = lines[index].match(bulletPattern);
    if (!bullet) continue;

    const [, monthText, dayText, title, description] = bullet;
    let image = "";

    for (let cursor = index + 1; cursor < lines.length; cursor += 1) {
      if (bulletPattern.test(lines[cursor])) break;
      const imageMatch = lines[cursor].match(imagePattern);
      if (imageMatch) {
        image = imageMatch[1]
          .replace("../../public/assets/", "/assets/")
          .replace("../../assets/", "/assets/");
        break;
      }
    }

    const entryMonth = Number(monthText);
    const day = Number(dayText);
    entries.push({
      id: `${year}-${monthText}-${dayText}-${entries.length}`,
      year,
      month: entryMonth,
      day,
      title,
      description,
      image,
    });
  }

  entries.sort((a, b) => b.day - a.day);

  return {
    id: `${year}-${String(month).padStart(2, "0")}`,
    year,
    month,
    label: `${year} 年 ${month} 月`,
    entries,
  };
}

export const archives = Object.entries(rawDocuments)
  .map(([path, raw]) => parseDocument(path, raw))
  .sort((a, b) => b.year - a.year || b.month - a.month);

export const allEntries = archives
  .flatMap((archive) => archive.entries)
  .sort(
    (a, b) =>
      b.year - a.year || b.month - a.month || b.day - a.day,
  );
