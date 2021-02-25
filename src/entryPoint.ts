// constants
const TO_EMAIL_ADDRESS = (PropertiesService.getScriptProperties().getProperty('toEmailAddress') ?? '').split(',');
const MESSAGE_TEMPLATE = `
本日は {today} です。
今年は既に {daysPassedThisYear}日 が過ぎて、
あと残り {daysLeftThisYear}日 です。
`;

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

const outputHelloWorld = () => console.log('hello world!');
const onSendMail = () => {
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
