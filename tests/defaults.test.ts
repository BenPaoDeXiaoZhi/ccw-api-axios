import { reqInterceptor } from "../src/interceptor";
import { setToken, token } from "../src";
import { randomUUID } from "crypto";

test("expect has guest-id when not login", async () => {
  const cfg = await reqInterceptor({
    headers: {},
  });
  expect(cfg.headers["Guest-id"]).not.toBe("");
});

test("expect guest-id to be empty when logged in", async () => {
  setToken(randomUUID());
  const cfg = await reqInterceptor({
    headers: {},
  });
  expect(cfg.headers["Cookie"]).toBe(`token=${token}`);
  expect(cfg.headers["Guest-id"]).toBeFalsy();
});
