import * as fs from 'fs';

export const readJsonFile = <T = unknown>(filename: string): T => JSON.parse(fs.readFileSync(filename, 'utf-8'));
export const createJsonFile = <T = unknown>(filename: string, data: T): void =>
  fs.writeFileSync(filename, JSON.stringify(data));

export const tryCatch = <T extends unknown[]>(tryer: (...args: T) => void, catcher?: (err?: any) => void) => (
  ...args: T
): void => {
  try {
    tryer(...args);
  } catch (err) {
    catcher(err);
    console.error(err);
    process.exit(1);
  }
};