import {test, expect} from "@playwright/test";

test("API: login user without password → should fail", async ({request}) => {
  const apiKey = process.env.REQRES_API_KEY ?? 'reqres-free-v1';

  const res = await request.post("https://reqres.in/api/login", {
    data: {email: "eve.holt@reqres.in"},
    headers: { 'x-api-key': apiKey },
  });
  expect(res.status(), await res.text()).toBe(400);
  const body = await res.json();
  expect(body.error).toBeTruthy();
});
