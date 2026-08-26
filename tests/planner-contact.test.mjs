import assert from "node:assert/strict";
import test from "node:test";

import {
  buildPlannerContactPrefill,
  validatePlannerSummaryUrl,
} from "../app/lib/planner-contact.ts";

const plannerUrl = "https://planner.birdbrain.it/?step=summary#plan=exact-reference";
const shortPlannerUrl = "https://planner.birdbrain.it/s/K7f2Qa";

test("valid Planner handoff creates an editable localized plain-text prefill", () => {
  const params = new URLSearchParams({
    planner: plannerUrl,
    lang: "sv",
    type: "Webbutik",
    scope: "6–10 sidor",
    direction: "Modigt & modernt",
    estimate: "13 125 kr – 17 125 kr (inkl. moms)",
  });
  const message = buildPlannerContactPrefill(`?${params}`);

  assert.match(message, /Webbplatstyp: Webbutik/);
  assert.match(message, /Modigt & modernt/);
  assert.match(message, /13 125 kr – 17 125 kr/);
  assert.match(message, new RegExp(plannerUrl.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  assert.equal(message.includes("<script>"), false);
});

test("invalid Planner references safely preserve the normal empty form", () => {
  assert.equal(buildPlannerContactPrefill("?planner=javascript%3Aalert(1)"), "");
  assert.equal(buildPlannerContactPrefill("?planner=https%3A%2F%2Fevil.example%2F%3Fstep%3Dsummary%23plan%3Dx"), "");
  assert.equal(validatePlannerSummaryUrl("not a URL"), null);
  assert.equal(validatePlannerSummaryUrl("http://localhost:3000/?step=summary#plan=x"), null);
});

test("trusted first-party short Planner links are accepted without weakening URL validation", () => {
  assert.equal(validatePlannerSummaryUrl(shortPlannerUrl), shortPlannerUrl);
  assert.match(buildPlannerContactPrefill(`?${new URLSearchParams({ planner: shortPlannerUrl })}`), /https:\/\/planner\.birdbrain\.it\/s\/K7f2Qa/);
  assert.equal(validatePlannerSummaryUrl("https://planner.birdbrain.it/s/too-short-code"), null);
  assert.equal(validatePlannerSummaryUrl("https://planner.birdbrain.it/s/K7f2Qa?next=https://evil.example"), null);
});

test("existing user-entered content is never overwritten", () => {
  const params = new URLSearchParams({ planner: plannerUrl, type: "Online store" });
  assert.equal(buildPlannerContactPrefill(`?${params}`, "My existing message"), "My existing message");
});

test("canonical long Planner links remain accepted", () => {
  assert.equal(validatePlannerSummaryUrl(plannerUrl), plannerUrl);
});

test("a malformed Planner URL does not erase independently valid structured context", () => {
  const params = new URLSearchParams({
    planner: "http://localhost:3000/s/K7f2Qa",
    lang: "sv",
    type: "Webbutik",
    scope: "6–10 sidor",
    estimate: "13 125 kr – 17 125 kr (inkl. moms)",
    paket: "webbpaket-plus",
  });
  const message = buildPlannerContactPrefill(`?${params}`);

  assert.match(message, /Webbplatstyp: Webbutik/);
  assert.match(message, /Omfattning: 6–10 sidor/);
  assert.match(message, /Valt paket: Webbpaket Plus/);
  assert.match(message, /13 125 kr – 17 125 kr/);
  assert.doesNotMatch(message, /Delbar sammanfattning/);
  assert.doesNotMatch(message, /localhost/);
});

test("unknown enum and package values are omitted rather than trusted", () => {
  const params = new URLSearchParams({
    planner: plannerUrl,
    type: "<script>alert(1)</script>",
    scope: "Unlimited pages",
    direction: "javascript:alert(1)",
    paket: "enterprise",
  });
  const message = buildPlannerContactPrefill(`?${params}`);

  assert.doesNotMatch(message, /<script>|Unlimited pages|javascript:|enterprise/);
  assert.match(message, /Delbar sammanfattning/);
});
