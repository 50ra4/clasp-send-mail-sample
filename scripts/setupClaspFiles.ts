import * as path from 'path';
import { Command } from 'commander';
import { config } from 'dotenv';

import { createJsonFile, tryCatch } from './utils';
import {
  SCRIPT_OPTION,
  DEFAULT_CLAPS_LOGIN_FILE_PATH,
  DEFAULT_CLAPS_SETTING_FILE_PATH,
  INITIAL_CLASP_LOGIN_INFO,
  INITIAL_CLASP_SETTING,
  CLASP_LOGIN_FILE_NAME,
  CLAPS_SETTING_FILE_NAME,
} from './constants';

const getOptions = () =>
  new Command()
    .option(
      `--${SCRIPT_OPTION.cd}`, //
      'execute for CD',
      false,
    )
    .option(
      `-rcp, --${SCRIPT_OPTION.clasprcPath} [filepath]`,
      'import path ".clasprc.json"',
      DEFAULT_CLAPS_LOGIN_FILE_PATH,
    )
    .option(
      `-p, --${SCRIPT_OPTION.claspPath} [filepath]`, //
      'import path ".clasp.json"',
      DEFAULT_CLAPS_SETTING_FILE_PATH,
    )
    .parse(process.argv)
    .opts();

const main = tryCatch(() => {
  const options = getOptions();

  const isCD = options[SCRIPT_OPTION.cd];
  const claspFilePath = isCD
    ? options[SCRIPT_OPTION.claspPath]
    : path.join(process.cwd(), '.output', CLAPS_SETTING_FILE_NAME);
  const clasprcFilePath = isCD
    ? options[SCRIPT_OPTION.clasprcPath]
    : path.join(process.cwd(), '.output', CLASP_LOGIN_FILE_NAME);

  console.log({ isCD, claspFilePath, clasprcFilePath });

  if (!isCD) {
    config();
  }

  const setting = {
    ...INITIAL_CLASP_SETTING,
    scriptId: process.env.SCRIPT_ID,
  };
  const info = {
    ...INITIAL_CLASP_LOGIN_INFO,
    token: {
      ...INITIAL_CLASP_LOGIN_INFO.token,
      refresh_token: process.env.REFRESH_TOKEN,
    },
  };
  createJsonFile(claspFilePath, setting);
  createJsonFile(clasprcFilePath, info);
  process.exit(0);
});

main();
