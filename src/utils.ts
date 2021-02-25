export const getToday = (): Date => new Date();
export const replaceMessage = (template: string, replaceParams: Record<string | number, unknown>): string =>
  Object.entries(replaceParams).reduce(
    (acc, [key, value]) => acc.replace(`{${key}}`, typeof value === 'string' ? value : String(value)),
    template,
  );
