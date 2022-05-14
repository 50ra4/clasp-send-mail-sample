import startOfYear from 'date-fns/startOfYear';
import endOfYear from 'date-fns/endOfYear';
import differenceInDays from 'date-fns/differenceInDays';
import format from 'date-fns/format';
import addDays from 'date-fns/addDays';

import { MESSAGE_TEMPLATE } from './constants';
import { mathFloor, replaceMessage } from './utils';

const floor = mathFloor(1);

export const createMail = (date: Date): { subject: string; body: string } => {
  const startOfThisYear = startOfYear(date);
  const startOfNextYear = addDays(endOfYear(date), 1);
  const daysPassedThisYear = differenceInDays(date, startOfThisYear);
  const daysLeftThisYear = differenceInDays(startOfNextYear, date);
  const daysThisYear = differenceInDays(startOfNextYear, startOfThisYear);
  const percentPassedThisYear = floor((daysPassedThisYear / daysThisYear) * 100);
  const percentLeftThisYear = floor((daysLeftThisYear / daysThisYear) * 100);
  const subject = `【今年の残り日数】あと${daysLeftThisYear}日(${percentLeftThisYear})`;
  const body = replaceMessage(MESSAGE_TEMPLATE, {
    today: format(date, 'yyyy/MM/dd'),
    daysPassedThisYear,
    daysLeftThisYear,
    percentPassedThisYear: `${percentPassedThisYear}%`,
    percentLeftThisYear: `${percentLeftThisYear}%`,
  });
  return { subject, body };
};
