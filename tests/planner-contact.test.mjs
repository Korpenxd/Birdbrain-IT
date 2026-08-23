import assert from "node:assert/strict";
import test from "node:test";

import {
  buildPlannerContactPrefill,
  validatePlannerSummaryUrl,
} from "../app/lib/planner-contact.ts";

const plannerUrl = "https://planner.birdbrain.it/?step=summary#plan=exact-reference";

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
});

test("existing user-entered content is never overwritten", () => {
  const params = new URLSearchParams({ planner: plannerUrl, type: "Online store" });
  assert.equal(buildPlannerContactPrefill(`?${params}`, "My existing message"), "My existing message");
});
