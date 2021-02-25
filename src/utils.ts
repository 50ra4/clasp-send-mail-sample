export const getToday = (): Date => new Date();
export const startOfYear = (date: Date): Date => new Date(`${date.getFullYear()}-01-01`);
export const endOfYear = (date: Date): Date => new Date(`${date.getFullYear()}-12-31`);
export const addDays = (date: Date, amount: number): Date => {
  const newDate = new Date(date.toISOString());
  newDate.setDate(date.getDate() + amount);
  return newDate;
};
export const differenceInDays = (left: Date, right: Date): number =>
  Math.floor((left.getTime() - right.getTime()) / 86400000);
export const formatDate = (date: Date, format: string): string => Utilities.formatDate(date, 'JST', format);
export const replaceMessage = (template: string, replaceParams: Record<string | number, unknown>): string =>
  Object.entries(replaceParams).reduce(
    (acc, [key, value]) => acc.replace(`{${key}}`, typeof value === 'string' ? value : String(value)),
    template,
  );
