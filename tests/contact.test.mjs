import assert from "node:assert/strict";
import { after, beforeEach, test } from "node:test";
import { readFile } from "node:fs/promises";

const originalFetch = globalThis.fetch;
const originalEnvironment = {
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  CONTACT_TO: process.env.CONTACT_TO,
  CONTACT_FROM: process.env.CONTACT_FROM,
};

process.env.RESEND_API_KEY = "re_test_key";
process.env.CONTACT_TO = "recipient@example.com";
process.env.CONTACT_FROM = "Birdbrain IT <sender@birdbrain.it>";

const providerRequests = [];
let providerResponse = { status: 200, body: { id: "mock-email-id" } };

globalThis.fetch = async (input, init) => {
  if (String(input) !== "https://api.resend.com/emails") {
    return originalFetch(input, init);
  }

  providerRequests.push(JSON.parse(String(init?.body ?? "{}")));
  return Response.json(providerResponse.body, { status: providerResponse.status });
};

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("contact-test", `${process.pid}-${Date.now()}`);
const { default: worker } = await import(workerUrl.href);

function restoreEnvironmentVariable(name, value) {
  if (value === undefined) delete process.env[name];
  else process.env[name] = value;
}

after(() => {
  globalThis.fetch = originalFetch;
  restoreEnvironmentVariable("RESEND_API_KEY", originalEnvironment.RESEND_API_KEY);
  restoreEnvironmentVariable("CONTACT_TO", originalEnvironment.CONTACT_TO);
  restoreEnvironmentVariable("CONTACT_FROM", originalEnvironment.CONTACT_FROM);
});

beforeEach(() => {
  process.env.RESEND_API_KEY = "re_test_key";
  process.env.CONTACT_TO = "recipient@example.com";
  process.env.CONTACT_FROM = "Birdbrain IT <sender@birdbrain.it>";
  providerRequests.length = 0;
  providerResponse = { status: 200, body: { id: "mock-email-id" } };
});

function postContact(body, raw = false) {
  return worker.fetch(
    new Request("http://localhost/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: raw ? body : JSON.stringify(body),
    }),
    {
      ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
    },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

const validContact = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  message: "Jag vill diskutera en ny webbplats.",
  website: "",
};

test("normal and known package contacts reach Resend with the expected context", async () => {
  const cases = [
    [undefined, "Ny Birdbrain IT-förfrågan", null],
    ["webbpaket", "Ny Webbpaket-förfrågan", "Gäller: Webbpaket"],
    ["webbpaket-plus", "Ny Webbpaket Plus-förfrågan", "Gäller: Webbpaket Plus"],
  ];

  for (const [packageId, subjectText, messageText] of cases) {
    const response = await postContact({ ...validContact, packageId });
    assert.equal(response.status, 200);
    assert.equal((await response.json()).success, true);

    const sentEmail = providerRequests.at(-1);
    assert.match(sentEmail.subject, new RegExp(subjectText));
    if (messageText) assert.match(sentEmail.text, new RegExp(messageText));
    else assert.doesNotMatch(sentEmail.text, /Gäller:/);
  }
});

test("unknown packages are ignored instead of breaking contact delivery", async () => {
  const response = await postContact({ ...validContact, packageId: "unknown" });
  assert.equal(response.status, 200);
  assert.match(providerRequests[0].subject, /Ny Birdbrain IT-förfrågan/);
  assert.doesNotMatch(providerRequests[0].text, /Gäller:/);
});

test("malformed JSON is rejected before contacting the provider", async () => {
  const originalWarn = console.warn;
  console.warn = () => {};

  try {
    const response = await postContact("{", true);
    assert.equal(response.status, 400);
    assert.deepEqual(await response.json(), { error: "Invalid form data." });
    assert.equal(providerRequests.length, 0);
  } finally {
    console.warn = originalWarn;
  }
});

test("missing required configuration returns a safe 500 without calling Resend", async () => {
  delete process.env.RESEND_API_KEY;
  delete process.env.CONTACT_TO;
  const logged = [];
  const originalError = console.error;
  console.error = (...values) => logged.push(values);

  try {
    const response = await postContact(validContact);
    assert.equal(response.status, 500);
    assert.deepEqual(await response.json(), {
      error: "Contact form is not configured.",
    });
    assert.equal(providerRequests.length, 0);
    assert.deepEqual(logged[0][1], ["RESEND_API_KEY", "CONTACT_TO"]);
  } finally {
    console.error = originalError;
  }
});

test("provider failures return a safe failed request", async () => {
  providerResponse = {
    status: 422,
    body: {
      name: "validation_error",
      message: "Sender domain is not verified.",
      statusCode: 422,
    },
  };
  const originalError = console.error;
  console.error = () => {};

  try {
    const response = await postContact(validContact);
    assert.equal(response.status, 502);
    assert.deepEqual(await response.json(), {
      error: "The email could not be sent.",
    });
  } finally {
    console.error = originalError;
  }
});

test("contact feedback has separate accessible success and error treatments", async () => {
  const component = await readFile(
    new URL("../app/components/site-shell.tsx", import.meta.url),
    "utf8",
  );
  const css = await readFile(new URL("../app/globals.css", import.meta.url), "utf8");

  assert.match(
    component,
    /className="form-note form-note-success" role="status"/,
  );
  assert.match(
    component,
    /className="form-note form-note-error" role="alert"/,
  );
  assert.match(css, /\.form-note\.form-note-error\s*{\s*color:\s*#ff8fa3;/);
  assert.match(
    css,
    /\.contact-form \.form-note\.form-note-success\s*{\s*color:\s*#167858;/,
  );
  assert.match(
    css,
    /\.contact-form \.form-note\.form-note-error\s*{\s*color:\s*#b42343;/,
  );
});
