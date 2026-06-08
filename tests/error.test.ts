import { resInterceptor } from "../src/interceptor";
test("expect throw error when status isn't 200", async () => {
  await expect(
    resInterceptor({
      data: {
        body: null,
        code: "4031111",
        msg: "error",
        status: 403,
      },
    }),
  ).rejects.toThrow("ccw axios Request failed: error");
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
  expect(res.data.body).toBe(1234);
});
