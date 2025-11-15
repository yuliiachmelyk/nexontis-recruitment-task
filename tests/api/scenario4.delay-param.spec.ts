import {test, expect} from "@playwright/test";

for (const delay of [0, 3] as const) {
  test(`API: list users with delay=${delay}`, async ({request}) => {
    const start = Date.now();
    const apiKey = process.env.REQRES_API_KEY ?? 'reqres-free-v1';
    const res = await request.get(`https://reqres.in/api/users?delay=${delay}`, {
      headers: { 'x-api-key': apiKey },
    });
    const elapsed = Date.now() - start;

    expect(
      res.ok(),
      `status=${res.status()} body=${await res.text()}`
    ).toBeTruthy();

    if (delay === 0) {
      expect(elapsed).toBeLessThanOrEqual(1000);
    } else {
      expect(elapsed).toBeGreaterThan(1000);
    }
  });
}
