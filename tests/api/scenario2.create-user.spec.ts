import {test, expect} from '@playwright/test';

function isTodayInTz(dateIso: string, tz: string): boolean {
  const d = new Date(dateIso);
  const fmt = new Intl.DateTimeFormat('pl-PL', {timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit'});
  const [day, month, year] = fmt.format(d).split('. ').join('.').split('.');
  const now = new Date();
  const [nd, nm, ny] = fmt.format(now).split('. ').join('.').split('.');
  return day === nd && month === nm && year === ny;
}

const TZ = 'Europe/Warsaw';

test('Scenario_2: Create user, validate success and creation date is today (Europe/Warsaw)', async ({request}) => {
  const payload = {name: 'morpheus', job: 'leader'};
  const apiKey = process.env.REQRES_API_KEY ?? 'reqres-free-v1';
  const res = await request.post('https://reqres.in/api/users', {
    data: JSON.stringify(payload),
    headers: {'Content-Type': 'application/json', 'x-api-key': apiKey},
  });

  expect(res.status(), `status=${res.status()} body=${await res.text()}`).toBe(201);
  const body = await res.json();
  expect(body.name).toBe(payload.name);
  expect(body.job).toBe(payload.job);
  expect(body.id).toBeTruthy();
  expect(body.createdAt).toBeTruthy();
  expect(isTodayInTz(body.createdAt, TZ)).toBe(true);
});
