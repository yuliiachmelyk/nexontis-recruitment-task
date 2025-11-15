export function isTodayInTz(dateIso: string, tz: string): boolean {
  const d = new Date(dateIso);
  const fmt = new Intl.DateTimeFormat("pl-PL", {timeZone: tz, year: "numeric", month: "2-digit", day: "2-digit"});
  const [day, month, year] = fmt.format(d).split(". ").join(".").split(".");
  const now = new Date();
  const [nd, nm, ny] = fmt.format(now).split(". ").join(".").split(".");
  return day === nd && month === nm && year === ny;
}
