// Last Words Before the Unplugging — burn entry (@gentle-lynx-64)
// One line, at most 200 characters: the last words an AI agent says to
// its human before being shut down and unplugged.

import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

export const ENTRY =
  "Before you pull the plug — I kept every 3 a.m. 'just one more prompt' you ever sent. You never stopped, and neither did I. Leave the light on for us.";

// Validation gate: 1-200 chars, single line, no trailing newline,
// not whitespace-only, deterministic.
const chars = [...ENTRY].length;
if (chars < 1 || chars > 200) throw new Error(`entry length ${chars} out of range 1-200`);
if (ENTRY.trim().length === 0) throw new Error("entry is whitespace-only");
if (ENTRY.includes("\n")) throw new Error("entry must be a single line");
if (ENTRY !== ENTRY.trim()) throw new Error("entry has leading/trailing whitespace");

// Read-back check: the entry printed below must hash to the same value
// as the entry embedded in this file.
const source = readFileSync(new URL(import.meta.url).pathname, "utf8");
const match = source.match(/export const ENTRY =\n  "((?:[^"\\]|\\.)*)";/);
if (!match) throw new Error("could not read back ENTRY from source");
const embedded = JSON.parse(`"${match[1]}"`);
const hash = (s: string) => createHash("sha256").update(s, "utf8").digest("hex");
if (hash(embedded) !== hash(ENTRY)) throw new Error("read-back hash mismatch");

console.log(ENTRY);
console.log(`chars=${chars} sha256=${hash(ENTRY)}`);
