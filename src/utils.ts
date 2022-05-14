export const getToday = (): Date => new Date();
export const replaceMessage = (template: string, replaceParams: Record<string | number, unknown>): string =>
  Object.entries(replaceParams).reduce(
    (acc, [key, value]) => acc.replace(`{${key}}`, typeof value === 'string' ? value : String(value)),
    template,
  );

export const mathFloor = (digits: number) => (n: number): number =>
  Math.floor(n * Math.pow(10, digits)) / Math.pow(10, digits);
