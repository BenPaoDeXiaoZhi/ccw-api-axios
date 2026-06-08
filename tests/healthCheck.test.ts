import { randomUUID } from "crypto";
import { getHmacKey } from "../src/interceptor";
test("expect key to be lower", async () => {
  for (let i = 0; i < 10; i++) {
    expect(await getHmacKey({ "Guest-id": randomUUID() })).toMatch(
      /[a-z|0-9]{8}/,
    );
  }
});
