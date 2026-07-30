import type { ReactNode } from "react";

const linkPattern = /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g;

export default function InlineText({ text }: { text: string }) {
  const nodes: ReactNode[] = [];
  let cursor = 0;

  for (const match of text.matchAll(linkPattern)) {
    const index = match.index ?? 0;
    if (index > cursor) {
      nodes.push(text.slice(cursor, index));
    }
    nodes.push(
      <a
        className="inline-link"
        href={match[2]}
        key={`${match[2]}-${index}`}
        rel="noreferrer"
        target="_blank"
      >
        {match[1]}
      </a>,
    );
    cursor = index + match[0].length;
  }

  if (cursor < text.length) {
    nodes.push(text.slice(cursor));
  }

  return <>{nodes}</>;
}
