import type { ReadmeBlock } from "./types";

// Roughly a short card paragraph or two; whole blocks are kept where they fit.
const MAX_SUMMARY_CHARS = 900;

const SUMMARY_MARKER =
  /<!--\s*portfolio:summary\s*-->([\s\S]*?)<!--\s*\/portfolio:summary\s*-->/i;

const FENCE = /^\s*(```|~~~)/;
const HEADING = /^#{1,6}\s/;
const LIST_ITEM = /^\s*(?:[-*+]|\d+[.)])\s+(.*)$/;
const RULE = /^\s*([-*_=])(\s*\1){2,}\s*$/;
const SKIPPED_LINE = /^\s*(?:>|\||<|\[[^\]]+\]:\s)/;

/**
 * Turns a README into plain-text blocks for a project card: the section a
 * README marks with `<!-- portfolio:summary -->`, or else its intro (between
 * the title and the first heading after it), capped in length.
 */
export function summarizeReadme(markdown: string): ReadmeBlock[] {
  const text = markdown.replace(/\r\n?/g, "\n");
  const marked = SUMMARY_MARKER.exec(text);
  const lines = marked ? marked[1].split("\n") : introLines(text.split("\n"));
  return capLength(toBlocks(lines));
}

function introLines(lines: string[]): string[] {
  const intro: string[] = [];
  let inFence = false;
  let seenTitle = !lines.some((line) => /^#\s/.test(line));

  for (const line of lines) {
    if (FENCE.test(line)) {
      inFence = !inFence;
    } else if (!inFence && HEADING.test(line)) {
      if (seenTitle) {
        break;
      }
      seenTitle = true;
      continue;
    }
    if (seenTitle) {
      intro.push(line);
    }
  }
  return intro;
}

function toBlocks(lines: string[]): ReadmeBlock[] {
  const blocks: ReadmeBlock[] = [];
  let paragraph: string[] = [];
  let items: string[] = [];
  let inFence = false;

  const flush = () => {
    const text = cleanInline(paragraph.join(" "));
    if (text) {
      blocks.push({ kind: "paragraph", text });
    }
    const listItems = items.map(cleanInline).filter(Boolean);
    if (listItems.length) {
      blocks.push({ kind: "list", items: listItems });
    }
    paragraph = [];
    items = [];
  };

  for (const line of lines) {
    if (FENCE.test(line)) {
      inFence = !inFence;
      flush();
      continue;
    }
    if (inFence || !line.trim() || RULE.test(line) || HEADING.test(line) || SKIPPED_LINE.test(line)) {
      flush();
      continue;
    }
    const item = LIST_ITEM.exec(line);
    if (item) {
      if (paragraph.length) {
        flush();
      }
      items.push(item[1]);
    } else if (items.length) {
      items[items.length - 1] += ` ${line.trim()}`;
    } else {
      paragraph.push(line.trim());
    }
  }
  flush();
  return blocks;
}

function cleanInline(text: string): string {
  return text
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[\s*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]+)\]\[[^\]]*\]/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/(\*\*|__)(?=\S)(.+?)(?<=\S)\1/g, "$2")
    .replace(/(?<![\w*])\*(?=\S)(.+?)(?<=\S)\*(?![\w*])/g, "$1")
    .replace(/(?<![\w_])_(?=\S)(.+?)(?<=\S)_(?![\w_])/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

function capLength(blocks: ReadmeBlock[]): ReadmeBlock[] {
  const kept: ReadmeBlock[] = [];
  let used = 0;

  for (const block of blocks) {
    const room = MAX_SUMMARY_CHARS - used;
    if (block.kind === "paragraph") {
      if (block.text.length <= room) {
        kept.push(block);
        used += block.text.length;
      } else if (!kept.length) {
        kept.push({ kind: "paragraph", text: truncateAtSentence(block.text, room) });
      }
      if (block.text.length > room) {
        break;
      }
    } else {
      const items: string[] = [];
      for (const item of block.items) {
        if (used + item.length > MAX_SUMMARY_CHARS) {
          break;
        }
        items.push(item);
        used += item.length;
      }
      if (items.length) {
        kept.push({ kind: "list", items });
      }
      if (items.length < block.items.length) {
        break;
      }
    }
  }
  return kept;
}

function truncateAtSentence(text: string, limit: number): string {
  const cut = text.slice(0, limit);
  const sentenceEnd = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("! "), cut.lastIndexOf("? "));
  return sentenceEnd > 0 ? cut.slice(0, sentenceEnd + 1) : `${cut.slice(0, cut.lastIndexOf(" "))}…`;
}
