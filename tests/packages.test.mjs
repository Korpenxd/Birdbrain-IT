import assert from "node:assert/strict";
import test from "node:test";

import { getWebsitePackage, WEBSITE_PACKAGES } from "../app/lib/packages.ts";

test("website package IDs resolve only known package selections", () => {
  assert.equal(WEBSITE_PACKAGES.length, 2);
  assert.equal(getWebsitePackage("webbpaket")?.priceExVat, "16 900 kr");
  assert.equal(getWebsitePackage("webbpaket-plus")?.priceIncVat, "27 375 kr");
  assert.equal(getWebsitePackage("anything-else"), undefined);
  assert.equal(getWebsitePackage(null), undefined);
});
