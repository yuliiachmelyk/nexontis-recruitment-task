import {test, expect} from "@playwright/test";

test("API: update user and validate response matches request body where applicable", async ({
  request,
}) => {
  const userId = 2;
  const payload = {name: "Updated QA", job: "Lead QA"};

  const apiKey = process.env.REQRES_API_KEY ?? 'reqres-free-v1';

  const res = await request.put(`https://reqres.in/api/users/${userId}`, {
    data: payload,
    headers: { 'x-api-key': apiKey },
  });
  expect([200, 201]).toContain(res.status());

  const body = await res.json();
  expect(body.name).toBe(payload.name);
  expect(body.job).toBe(payload.job);
  expect(body.updatedAt || body.updated_at).toBeTruthy();
});
