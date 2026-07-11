import { randomUUID } from "crypto";
import { getHmacKey } from "../src/interceptor";
import test from "node:test";
import assert from "assert";
test("expect key to be lower", async () => {
  for (let i = 0; i < 10; i++) {
    assert.match(
      await getHmacKey({ "Guest-id": randomUUID() }),
      /[a-z|0-9]{8}/,
    );
  }
});
