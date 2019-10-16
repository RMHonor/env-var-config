export interface EnvConfigOption {
  description?: string;
  // default?: string;
}

export type EnvConfigSet = {
  [key: string]: EnvConfigSet | EnvConfigOption;
}

export type EnvConfigResult<T extends EnvConfigSet> = {
  [U in keyof T]: T[U] extends EnvConfigSet ? EnvConfigResult<T[U]> : string;
}

export default <T extends EnvConfigSet>(config: T): EnvConfigResult<T> => {
  console.log(process.env)
  if (!process || !process.env) {
    throw new Error('Invalid platform, please use NodeJS v0.1.27 or higher');
  }

  const output = Object.keys(config).reduce((acc, k) => `${acc}${camelCaseToSnakeCase(k)}\t${config[k].description}\n`, '');

  console.log(getConfigOutput(config));

  const res: any = {};
  return res;
}

const getConfigOutput = (config: EnvConfigSet): string => {
  const maxLen = Math.max(...Object.keys(config).map((k) => camelCaseToSnakeCase(k).length));

  return Object.keys(config).map((k) => {
    return `${camelCaseToSnakeCase(k).padEnd(maxLen)} ${config[k].description}`
  }).join('\n');
}

/**
 * Converts camel case strings to capitalied snake case strings.
 *
 * @example `variableName` becomes `VARIABLE_NAME`
 */
const camelCaseToSnakeCase = (input: string): string => {
  return input
    .split('')
    .reduce((acc, next) => {
      if (next.toUpperCase() === next) {
        return `${acc}_${next}`;
      } else {
        return acc + next.toUpperCase();
      }
    }, '');
}
