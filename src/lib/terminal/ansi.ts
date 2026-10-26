// ANSI helpers for the curl portfolio. Colors use the 256-color palette so
// they render the same in Terminal.app, which has no truecolor support.

export const WIDTH = 68;
export const MARGIN = "  ";

const style =
  (...codes: number[]) =>
  (text: string) =>
    `\x1b[${codes.join(";")}m${text}\x1b[0m`;

// Zinc greys from globals.css, plus the Authometry lime (#CCF24A).
export const c = {
  title: style(1, 38, 5, 255),
  text: style(38, 5, 252),
  muted: style(38, 5, 245),
  dim: style(38, 5, 240),
  faint: style(38, 5, 237),
  lime: style(38, 5, 191),
  limeBold: style(1, 38, 5, 191),
  blink: style(5, 38, 5, 191),
};

// biome-ignore lint/suspicious/noControlCharactersInRegex: matches ANSI escapes
const ANSI_PATTERN = /\x1b\[[0-9;]*m|\x1b\]8;;[^\x1b]*\x1b\\/g;

export const stripAnsi = (text: string) => text.replace(ANSI_PATTERN, "");

export const visibleLength = (text: string) => [...stripAnsi(text)].length;

export const padEnd = (text: string, width: number) =>
  text + " ".repeat(Math.max(0, width - visibleLength(text)));

/** OSC 8 hyperlink: clickable in most modern terminals, plain text elsewhere. */
export const link = (href: string, label = displayUrl(href)) =>
  `\x1b]8;;${href}\x1b\\${label}\x1b]8;;\x1b\\`;

export const displayUrl = (href: string) =>
  href.replace(/^https?:\/\//, "").replace(/\/$/, "");

/** Word-wraps plain text and styles each line. */
export const wrap = (
  text: string,
  {
    width = WIDTH,
    indent = "",
    paint = c.text,
  }: { width?: number; indent?: string; paint?: (line: string) => string } = {},
) => {
  const lines: string[] = [];
  let line = "";
  for (const word of text.split(/\s+/).filter(Boolean)) {
    if (line && line.length + 1 + word.length > width - indent.length) {
      lines.push(line);
      line = word;
    } else {
      line = line ? `${line} ${word}` : word;
    }
  }
  if (line) lines.push(line);
  return lines.map((wrapped) => MARGIN + indent + paint(wrapped));
};

/** Wraps a list between items, so a separator never starts a line. */
export const list = (items: readonly string[], paint = c.muted) => {
  const separator = c.faint("  ·  ");
  const lines: string[][] = [[]];
  let length = 0;
  for (const item of items) {
    const line = lines[lines.length - 1];
    if (line.length && length + 5 + item.length > WIDTH) {
      lines.push([item]);
      length = item.length;
    } else {
      length += (line.length ? 5 : 0) + item.length;
      line.push(item);
    }
  }
  return lines.map((line) => MARGIN + line.map(paint).join(separator));
};

export const section = (label: string) => {
  const rule = "─".repeat(Math.max(0, WIDTH - label.length - 4));
  return [
    "",
    `${MARGIN}${c.faint("──")} ${c.muted(label)} ${c.faint(rule)}`,
    "",
  ];
};
