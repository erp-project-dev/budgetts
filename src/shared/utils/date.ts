export function getCurrentPeriod(): string {
  return new Date().toISOString().slice(0, 7);
}
