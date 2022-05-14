import startOfYear from 'date-fns/startOfYear';
import endOfYear from 'date-fns/endOfYear';
import differenceInDays from 'date-fns/differenceInDays';
import format from 'date-fns/format';
import addDays from 'date-fns/addDays';

import { MESSAGE_TEMPLATE, TO_EMAIL_ADDRESS } from './constants';
import { getToday, mathFloor, replaceMessage } from './utils';

const floor = mathFloor(1);

export const outputHelloWorld = (): void => console.log('hello world!');
export const onSendMail = (): void => {
  const today = getToday();
  const startOfThisYear = startOfYear(today);
  const startOfNextYear = addDays(endOfYear(today), 1);
  const daysPassedThisYear = differenceInDays(today, startOfThisYear);
  const daysLeftThisYear = differenceInDays(startOfNextYear, today);
  const daysThisYear = differenceInDays(startOfNextYear, startOfThisYear);
  const percentPassedThisYear = floor((daysPassedThisYear / daysThisYear) * 100);
  const percentLeftThisYear = floor((daysLeftThisYear / daysThisYear) * 100);
  const subject = `【今年の残り日数】あと${daysLeftThisYear}日(${percentLeftThisYear})`;
  const body = replaceMessage(MESSAGE_TEMPLATE, {
    today: format(today, 'yyyy/MM/dd'),
    daysPassedThisYear,
    daysLeftThisYear,
    percentPassedThisYear: `${percentPassedThisYear}%`,
    percentLeftThisYear: `${percentLeftThisYear}%`,
  });
  TO_EMAIL_ADDRESS.forEach((to) => MailApp.sendEmail({ to, subject, body }));
};
