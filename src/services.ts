import { getToday } from './utils';
import { createMail } from './mail';

export const outputHelloWorld = (): void => console.log('hello world!');
export const onSendMail = (): void => {
  const { subject, body } = createMail(getToday());
  const addresses = (PropertiesService.getScriptProperties().getProperty('toEmailAddress') ?? '').split(',');
  addresses.forEach((to) => MailApp.sendEmail({ to, subject, body }));
};
