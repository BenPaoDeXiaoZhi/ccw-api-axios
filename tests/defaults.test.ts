import { reqInterceptor } from "../src/interceptor";
import { setToken, token } from "../src";
import { randomUUID } from "crypto";
import test from "node:test";
import assert from "assert";

test("expect has guest-id when not login", async () => {
  const cfg = await reqInterceptor({
    headers: {},
  });
  assert.notEqual(cfg.headers["Guest-id"], "");
});

test("expect guest-id to be empty when logged in", async () => {
  setToken(randomUUID());
  const cfg = await reqInterceptor({
    headers: {},
  });
  assert.equal(cfg.headers["Cookie"], `token=${token}`);
  assert.equal(cfg.headers["Guest-id"], undefined);
});
