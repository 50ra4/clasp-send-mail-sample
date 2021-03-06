import startOfYear from 'date-fns/startOfYear';
import endOfYear from 'date-fns/endOfYear';
import differenceInDays from 'date-fns/differenceInDays';
import format from 'date-fns/format';
import addDays from 'date-fns/addDays';

import { MESSAGE_TEMPLATE, TO_EMAIL_ADDRESS } from './constants';
import { getToday, replaceMessage } from './utils';

export const outputHelloWorld = (): void => console.log('hello world!');
export const onSendMail = (): void => {
  const today = getToday();
  const startOfThisYear = startOfYear(today);
  const startOfNextYear = addDays(endOfYear(today), 1);
  const daysPassedThisYear = differenceInDays(today, startOfThisYear);
  const daysLeftThisYear = differenceInDays(startOfNextYear, today);
  const todayStr = format(today, 'yyyy/MM/dd');
  const subject = `【サンプル】今年は残り${daysLeftThisYear}日`;
  const body = replaceMessage(MESSAGE_TEMPLATE, { today: todayStr, daysPassedThisYear, daysLeftThisYear });
  TO_EMAIL_ADDRESS.forEach((to) => MailApp.sendEmail({ to, subject, body }));
};
