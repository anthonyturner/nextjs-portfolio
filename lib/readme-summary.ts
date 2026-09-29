import type { ReadmeBlock } from "./types";

// Roughly a short card paragraph or two; whole blocks are kept where they fit.
const MAX_SUMMARY_CHARS = 900;

const SUMMARY_MARKER =
  /<!--\s*portfolio:summary\s*-->([\s\S]*?)<!--\s*\/portfolio:summary\s*-->/i;

const FENCE = /^\s*(```|~~~)/;
const HEADING = /^#{1,6}\s/;
const SETEXT_UNDERLINE = /^\s*(=+|-+)\s*$/;
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
  // Comments are stripped only after the marker, which is itself a comment, is found.
  const source = (marked ? marked[1] : text).replace(/<!--[\s\S]*?-->/g, "");
  const lines = toAtxHeadings(source.split("\n"));
  return capLength(toBlocks(marked ? lines : introLines(lines)));
}

// Rewrites underlined headings ("Title" over "===" or "---") as "#" headings.
function toAtxHeadings(lines: string[]): string[] {
  const out: string[] = [];
  let inFence = false;

  for (const line of lines) {
    if (FENCE.test(line)) {
      inFence = !inFence;
    }
    const previous = out.at(-1);
    const underline = inFence ? null : SETEXT_UNDERLINE.exec(line);
    if (underline && previous?.trim() && !isStructural(previous)) {
      out[out.length - 1] = `${underline[1].startsWith("=") ? "#" : "##"} ${previous.trim()}`;
    } else {
      out.push(line);
    }
  }
  return out;
}

const isStructural = (line: string) =>
  FENCE.test(line) || HEADING.test(line) || LIST_ITEM.test(line) || RULE.test(line) || SKIPPED_LINE.test(line);

function introLines(lines: string[]): string[] {
  const intro: string[] = [];
  let inFence = false;
  let seenTitle = !hasTitle(lines);

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

function hasTitle(lines: string[]): boolean {
  let inFence = false;
  return lines.some((line) => {
    if (FENCE.test(line)) {
      inFence = !inFence;
      return false;
    }
    return !inFence && /^#\s/.test(line);
  });
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

// A link target, allowing one level of parentheses as in Wikipedia URLs.
const TARGET = String.raw`\((?:[^()]|\([^()]*\))*\)`;
const ENTITIES: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', "#39": "'", nbsp: " " };

function cleanInline(text: string): string {
  // Code spans are set aside first so the tag and emphasis rules leave them intact.
  const codeSpans: string[] = [];
  return text
    .replace(/`([^`]+)`/g, (_, code: string) => `\u0000${codeSpans.push(code) - 1}\u0000`)
    .replace(new RegExp(String.raw`!\[[^\]]*\]${TARGET}`, "g"), "")
    .replace(new RegExp(String.raw`\[\s*\]${TARGET}`, "g"), "")
    .replace(new RegExp(String.raw`\[([^\]]+)\]${TARGET}`, "g"), "$1")
    .replace(/\[([^\]]+)\]\[[^\]]*\]/g, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/&(amp|lt|gt|quot|#39|nbsp);/g, (_, name: string) => ENTITIES[name])
    .replace(/(\*\*|__)(?=\S)(.+?)(?<=\S)\1/g, "$2")
    .replace(/(?<![\w*])\*(?=\S)(.+?)(?<=\S)\*(?![\w*])/g, "$1")
    .replace(/(?<![\w_])_(?=\S)(.+?)(?<=\S)_(?![\w_])/g, "$1")
    .replace(/\u0000(\d+)\u0000/g, (_, index: string) => codeSpans[Number(index)])
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
      if (!items.length && !kept.length) {
        items.push(truncateAtSentence(block.items[0], MAX_SUMMARY_CHARS));
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
