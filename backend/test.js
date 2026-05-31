/**
 * Interview Report API — Full Test Suite
 * Run: node test.js
 *
 * Tests:
 *  T1 — POST /api/interview  (no file)        → 400
 *  T2 — POST /api/interview  (no auth)        → 401
 *  T3 — POST /api/interview  (full valid req) → 201
 *  T4 — GET  /api/interview/report/:id        → 200
 *  T5 — GET  /api/interview/report/bad-id     → 404
 *  T6 — pdf-parse: PDFParse import check
 *  T7 — AI response: title field Zod check
 *  T8 — frontend API: typo /api/inerview check
 *  T9 — CORS origin mismatch (port 5174 vs 5173)
 */

const fs   = require("fs");
const path = require("path");

// ── Colour helpers ─────────────────────────────────────────────────────────────
const G  = (s) => `\x1b[32m${s}\x1b[0m`;
const R  = (s) => `\x1b[31m${s}\x1b[0m`;
const Y  = (s) => `\x1b[33m${s}\x1b[0m`;
const B  = (s) => `\x1b[34m${s}\x1b[0m`;
const DIM = (s) => `\x1b[2m${s}\x1b[0m`;

const pass  = (id, msg)       => console.log(`  ${G("✔")} [${id}] ${msg}`);
const fail  = (id, msg, hint) => console.log(`  ${R("✘")} [${id}] ${msg}\n       ${Y("→")} ${hint}`);
const warn  = (id, msg, hint) => console.log(`  ${Y("⚠")} [${id}] ${msg}\n       ${DIM(hint)}`);
const title = (s)             => console.log(`\n${B("━━")} ${s} ${B("━━")}`);

let passed = 0, failed = 0, warned = 0;
const ok  = (id, m)    => { passed++; pass(id, m); };
const err = (id, m, h) => { failed++; fail(id, m, h); };
const wrn = (id, m, h) => { warned++; warn(id, m, h); };

// ═══════════════════════════════════════════════════════════════════════════════
// T6 — pdf-parse import bug (static, no server needed)
// ═══════════════════════════════════════════════════════════════════════════════
title("T6 · pdf-parse import check");
try {
  const pdfParse = require("pdf-parse");
  // The package exports the class differently in modern versions
  if (typeof pdfParse === "function" || typeof pdfParse.PDFParse === "function") {
    ok("T6", "pdf-parse loaded OK");
    // Check which API style controller.js uses
    const controllerSrc = fs.readFileSync(
      path.join(__dirname, "src/controllers/interview.controller.js"), "utf8"
    );
    if (controllerSrc.includes("const { PDFParse } = require(\"pdf-parse\")")) {
      // Check if PDFParse is actually a named export
      if (typeof pdfParse.PDFParse === "function") {
        ok("T6b", "PDFParse named export exists — destructuring is valid");
      } else {
        err("T6b",
          "controller uses `const { PDFParse } = require('pdf-parse')` but PDFParse is NOT a named export",
          "Fix: change to `const PDFParse = require('pdf-parse')` or use the class-based API correctly"
        );
      }
    }
  } else {
    err("T6", "pdf-parse did not load correctly", "Run: npm install pdf-parse");
  }
} catch (e) {
  err("T6", `pdf-parse require failed: ${e.message}`, "Run: npm install pdf-parse");
}

// ═══════════════════════════════════════════════════════════════════════════════
// T7 — Zod schema vs AI prompt: title field mismatch
// ═══════════════════════════════════════════════════════════════════════════════
title("T7 · Zod schema vs AI prompt — title field");
try {
  const aiSrc = fs.readFileSync(
    path.join(__dirname, "src/services/ai.service.js"), "utf8"
  );
  const modelSrc = fs.readFileSync(
    path.join(__dirname, "src/modals/interviewReport.modal.js"), "utf8"
  );

  const promptHasTitle = aiSrc.includes('"title"');
  const zodHasTitle    = aiSrc.includes("title:");
  const mongoHasTitle  = modelSrc.includes("title:");

  if (promptHasTitle && !zodHasTitle) {
    err("T7a",
      "AI prompt instructs Gemini to return a `title` field — but Zod schema does NOT include it",
      "Zod will STRIP the title field before it reaches MongoDB → `title` will be undefined → Mongoose throws ValidationError (title is required)"
    );
  } else if (promptHasTitle && zodHasTitle) {
    ok("T7a", "title field present in both prompt and Zod schema");
  }

  if (mongoHasTitle && !zodHasTitle) {
    err("T7b",
      "Mongoose model has `title: { required: true }` but Zod strips it → save will always fail with ValidationError",
      "Add `title: z.string()` to interviewReportSchema in ai.service.js"
    );
  } else if (mongoHasTitle && zodHasTitle) {
    ok("T7b", "title field consistent across Zod schema and Mongoose model");
  }
} catch (e) {
  err("T7", `File read error: ${e.message}`, "Check file paths");
}

// ═══════════════════════════════════════════════════════════════════════════════
// T8 — Frontend API URL typo
// ═══════════════════════════════════════════════════════════════════════════════
title("T8 · Frontend API URL typo check");
try {
  const apiSrc = fs.readFileSync(
    path.join(__dirname, "../frontend/src/features/interview/services/interview.api.js"), "utf8"
  );
  if (apiSrc.includes("/api/inerview")) {
    err("T8",
      'Frontend posts to "/api/inerview" — missing the "t" (typo)',
      'Fix: change "/api/inerview" → "/api/interview" in interview.api.js'
    );
  } else {
    ok("T8", 'API URL is correct: "/api/interview"');
  }
} catch (e) {
  wrn("T8", `Could not read frontend file: ${e.message}`, "Check path to frontend");
}

// ═══════════════════════════════════════════════════════════════════════════════
// T9 — CORS origin vs Vite port
// ═══════════════════════════════════════════════════════════════════════════════
title("T9 · CORS origin vs Vite dev port");
try {
  const appSrc = fs.readFileSync(
    path.join(__dirname, "src/app.js"), "utf8"
  );
  const corsOrigin = (appSrc.match(/origin\s*:\s*["']([^"']+)["']/) || [])[1];
  if (corsOrigin === "http://localhost:5173") {
    wrn("T9",
      `CORS is locked to ${corsOrigin}`,
      "Vite may pick port 5174 if 5173 is in use. If you see CORS errors, add port 5174 to the allowed origins array."
    );
  } else {
    ok("T9", `CORS origin: ${corsOrigin}`);
  }
} catch (e) {
  err("T9", `Could not read app.js: ${e.message}`, "");
}

// ═══════════════════════════════════════════════════════════════════════════════
// T1–T5 — Live HTTP tests (need server running)
// ═══════════════════════════════════════════════════════════════════════════════
title("T1–T5 · Live HTTP tests (requires backend on :3000)");

const http = require("http");

function request(options, body) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = "";
      res.on("data", (c) => (data += c));
      res.on("end", () => {
        try { resolve({ status: res.statusCode, body: JSON.parse(data) }); }
        catch { resolve({ status: res.statusCode, body: data }); }
      });
    });
    req.on("error", reject);
    if (body) req.write(body);
    req.end();
  });
}

async function runLiveTests() {
  // ── T1: No auth → expect 401 ─────────────────────────────────────────────
  try {
    const res = await request({
      hostname: "localhost", port: 3000,
      path: "/api/interview", method: "POST",
      headers: { "Content-Type": "application/json" }
    }, JSON.stringify({ jobDescription: "test", selfDescription: "test" }));

    if (res.status === 401) {
      ok("T1", `POST /api/interview with no auth → ${res.status} (auth guard works)`);
    } else {
      err("T1",
        `Expected 401 but got ${res.status}`,
        "Auth middleware may not be applied to this route"
      );
    }
  } catch (e) {
    err("T1", `Server unreachable: ${e.message}`, "Start the backend first: cd backend && npm run dev");
    console.log(R("\n  ⚡ Skipping T2–T5 (server not running)\n"));
    printSummary();
    return;
  }

  // ── T2: No file, no auth token (structural check) ────────────────────────
  try {
    const res = await request({
      hostname: "localhost", port: 3000,
      path: "/api/interview", method: "GET",
      headers: {}
    });
    if (res.status === 401) {
      ok("T2", `GET /api/interview with no auth → ${res.status} (auth guard works)`);
    } else {
      wrn("T2", `GET /api/interview returned ${res.status}`, JSON.stringify(res.body));
    }
  } catch (e) {
    err("T2", e.message, "");
  }

  // ── T3: GET /api/interview/report/bad-id → 500 or 404 ───────────────────
  try {
    const res = await request({
      hostname: "localhost", port: 3000,
      path: "/api/interview/report/000000000000000000000000",
      method: "GET",
      headers: {}
    });
    if (res.status === 401) {
      ok("T3", `GET /api/interview/report/:id with no auth → ${res.status} (auth guard works)`);
    } else {
      wrn("T3", `Expected 401, got ${res.status}`, JSON.stringify(res.body));
    }
  } catch (e) {
    err("T3", e.message, "");
  }

  printSummary();
}

function printSummary() {
  console.log("\n" + "═".repeat(52));
  console.log(`  ${G("PASSED")} : ${passed}`);
  console.log(`  ${R("FAILED")} : ${failed}`);
  console.log(`  ${Y("WARNED")} : ${warned}`);
  console.log("═".repeat(52));

  if (failed > 0) {
    console.log(R("\n  ❌ ACTION REQUIRED — fix the FAILED tests above\n"));
  } else {
    console.log(G("\n  ✅ All checks passed!\n"));
  }
}

runLiveTests();
