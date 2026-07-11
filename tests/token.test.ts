import { randomUUID } from "crypto";
import { setToken, token } from "../src/index";
import test from "node:test";
import assert from "assert";

test("expect token can be edited", async () => {
  for (let i = 0; i < 10; i++) {
    const newToken = randomUUID();
    setToken(`${newToken}`);
    assert.equal(token, newToken);
  }
});
