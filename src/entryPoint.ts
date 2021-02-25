import { onSendMail, outputHelloWorld } from './services';

global.onSubmitForm = onSendMail;
global.outputHelloWorld = outputHelloWorld;
