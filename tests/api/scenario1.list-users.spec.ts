import {test, expect} from "@playwright/test";

test("API: list users and print odd IDs", async ({request}) => {
  const apiKey = process.env.REQRES_API_KEY ?? 'reqres-free-v1';
  const res = await request.get("https://reqres.in/api/users?page=2", { headers: { 'x-api-key': apiKey } });
  expect(
    res.ok(),
    `status=${res.status()} body=${await res.text()}`
  ).toBeTruthy();

  const body = await res.json();
  const oddUsers = body.data.filter((u: any) => u.id % 2 === 1);
  console.log(
    "Odd-ID users:",
    oddUsers.map((u: any) => ({id: u.id, email: u.email}))
  );
});
