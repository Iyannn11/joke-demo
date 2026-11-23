import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The joke: the agent writes 2,000 lines overnight, yet the demo dies on
// line 1 — the single line the human wrote. Every developer who has demoed
// beside an agent recognises this exact moment.
const JOKE =
  "My AI agent wrote 2,000 lines overnight; the demo crashed on line 1 — the one I wrote.";

const chars = [...JOKE].length;
if (chars < 1 || chars > 280 || JOKE.trim().length === 0) {
  throw new Error(`entry.txt must be 1-280 non-whitespace characters, got ${chars}`);
}
// The em-dash pause before the twist is deliberate: it is where the room
// realises the crash was the human's fault, not the agent's.

const botDir = process.env.MAKEFUN_BOT_DIR ?? process.cwd();
// The grader mounts the repo read-only at MAKEFUN_BOT_DIR and gives a
// separate writable MAKEFUN_OUTPUT_DIR — writing under the bot dir fails.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? join(botDir, "output");
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), JOKE, "utf8");
