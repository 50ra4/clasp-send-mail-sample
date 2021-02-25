import { MESSAGE_TEMPLATE, TO_EMAIL_ADDRESS } from './constants';

// utils
const getToday = () => new Date();
const startOfYear = (date: Date) => new Date(`${date.getFullYear()}-01-01`);
const endOfYear = (date: Date) => new Date(`${date.getFullYear()}-12-31`);
const addDays = (date: Date, amount: number): Date => {
  const newDate = new Date(date.toISOString());
  newDate.setDate(date.getDate() + amount);
  return newDate;
};
const differenceInDays = (left: Date, right: Date) => Math.floor((left.getTime() - right.getTime()) / 86400000);
const formatDate = (date: Date, format: string): string => Utilities.formatDate(date, 'JST', format);
const replaceMessage = (template: string, replaceParams: Record<string | number, unknown>): string =>
  Object.entries(replaceParams).reduce(
    (acc, [key, value]) => acc.replace(`{${key}}`, typeof value === 'string' ? value : String(value)),
    template,
  );

export const outputHelloWorld = (): void => console.log('hello world!');
export const onSendMail = (): void => {
  const today = getToday();
  const startOfThisYear = startOfYear(today);
  const startOfNextYear = addDays(endOfYear(today), 1);
  const daysPassedThisYear = differenceInDays(today, startOfThisYear);
  const daysLeftThisYear = differenceInDays(startOfNextYear, today);
  const todayStr = formatDate(today, 'yyyy/MM/dd');
  const subject = `【サンプル】今年は残り${daysLeftThisYear}日`;
  const body = replaceMessage(MESSAGE_TEMPLATE, { today: todayStr, daysPassedThisYear, daysLeftThisYear });
  TO_EMAIL_ADDRESS.forEach((to) => MailApp.sendEmail({ to, subject, body }));
};

global.onSubmitForm = onSendMail;
global.outputHelloWorld = outputHelloWorld;
