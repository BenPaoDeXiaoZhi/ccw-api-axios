import test from "node:test";
import { resInterceptor } from "../src/interceptor";
import assert from "assert";

test("expect throw error when status isn't 200", async () => {
  await assert.rejects(
    resInterceptor({
      data: {
        body: null,
        code: "4031111",
        msg: "error",
        status: 403,
      },
    }),
    {
      message: "ccw axios Request failed: error",
    },
  );
});
test("expect origin data when status is 200", async () => {
  const res = await resInterceptor({
    data: {
      body: 1234,
      code: "200",
      msg: "",
      status: 200,
    },
  });
  assert.equal(res.data.body, 1234);
});
