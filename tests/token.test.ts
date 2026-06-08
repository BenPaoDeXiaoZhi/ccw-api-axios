import { randomUUID } from "crypto";
import { setToken, token } from "../src/index";

test("expect token can be edited", async () => {
  for (let i = 0; i < 10; i++) {
    const newToken = randomUUID();
    setToken(`${newToken}`);
    expect(token).toEqual(newToken);
  }
});
