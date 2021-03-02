import { execSync } from 'child_process';
import { Command } from 'commander';
import { createEnvironmentFile, readJsonFile, tryCatch } from './utils';
import {
  SCRIPT_OPTION,
  DEFAULT_CLAPS_LOGIN_FILE_PATH,
  DEFAULT_CLAPS_SETTING_FILE_PATH,
  ClaspLoginInfo,
  ClaspSetting,
  DEFAULT_ENVIRONMENT_FILE_PATH,
} from './constants';

const getOptions = () =>
  new Command()
    .option(
      `-d, --${SCRIPT_OPTION.deploymentName} [deploymentName]`, //
      'clasp deployment name',
      'Production',
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
  const { token } = readJsonFile<ClaspLoginInfo>(options[SCRIPT_OPTION.clasprcPath]);
  const { scriptId } = readJsonFile<ClaspSetting>(options[SCRIPT_OPTION.claspPath]);
  const { refresh_token } = token;
  const deployments = execSync('npx clasp deployments').toString().split('\n');
  const deploymentName = options[SCRIPT_OPTION.deploymentName];
  const targetDeployment = deployments.find((deployment) => deployment.includes(deploymentName));
  if (!targetDeployment) {
    throw Error(`"${deploymentName}" is not found clasp deployments`);
  }

  const deploymentId = targetDeployment.split(' ')[1];
  createEnvironmentFile(DEFAULT_ENVIRONMENT_FILE_PATH, {
    REFRESH_TOKEN: refresh_token,
    SCRIPT_ID: scriptId,
    DEPLOYMENT_ID: deploymentId,
  });
  process.exit(0);
});

main();
