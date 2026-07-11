const id = "2c49803291ad73ab59a63192a7f3a1be";
const a = "b3410505cfa032b150b2619288ad755c";
const b = 1780753018840;
import { reqInterceptor } from "../src/interceptor";
import { setToken } from "../src/index";
import test from "node:test";
import assert from "assert";
test("expect sign to be verified", async () => {
  setToken(id);
  const origin = {
    headers: { A: "", B: "" },
    data: {
      accessKey: "677a0edbb5dd9840c78c5f58",
      primaryKey: "677a0edbb5dd9840c78c5f58-u",
      secondaryKey: "0",
      filterKeys: ["0"],
    },
  };
  const req = await reqInterceptor(origin, b);
  assert.equal(req.headers.A, a);
  assert.equal(req.headers.B, String(b));
});
