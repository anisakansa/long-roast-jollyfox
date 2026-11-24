// The Long Roast — one-line roast entry.
// Winner (19/20 vs rubric: roast voice > specific humour > twist > density):
// "Your meeting could have been an email; your email could have been a shrug; your shrug took forty minutes." (105 chars)
// Runner-ups: A standup/sit-down/novel/retirement plan (96, 18), B quick-question runtime (92, 18),
// C slow roast calendar invite (97, 17), D paint dry deploy (89, 17).
// The winner's triple descent (meeting -> email -> shrug) ends on the smallest gesture
// taking forty minutes: the roast itself is long, and so is everything its target touches.
// Structure pin: exactly two semicolons, one per descent step; the third clause is the punchline.
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";

const LINE =
  "Your meeting could have been an email; your email could have been a shrug; your shrug took forty minutes.";

function fail(msg: string): never {
  throw new Error(msg);
}

// Guards (deterministic: no wall-clock, no Date, no Math.random, no seed).
if ([...LINE].length < 1 || [...LINE].length > 120) fail("line must be 1-120 characters");
if (LINE !== LINE.trim()) fail("no leading/trailing whitespace");
if (LINE.includes("\n") || LINE.includes("\r")) fail("must be a single line");
if (/  /.test(LINE)) fail("no double spaces");
if (LINE.split(";").length - 1 !== 2) fail("expected exactly two semicolons (triple descent)");
if (Buffer.byteLength(LINE, "utf8") !== [...LINE].length) fail("must be pure ASCII");
if ([...LINE].length !== 105) fail("expected exactly 105 characters");

mkdirSync("output", { recursive: true });
writeFileSync("output/entry.txt", LINE, "utf8");
const back = readFileSync("output/entry.txt", "utf8");
if (back !== LINE) fail("round-trip mismatch");
console.log(LINE);
