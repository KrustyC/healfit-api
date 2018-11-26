import _ from 'lodash';
import * as RealConfigValues from './config';
import * as TestConfigValues from './testing-env';

const env = process.env.NODE_ENV || 'production';

let ConfigValues = RealConfigValues;

if (env === 'testing' || env === 'ci') {
  ConfigValues = TestConfigValues;
}

/**
 * Returns a value for a given config key
 *
 * @param  {String} key
 * @return {String}
 */
export default function config(key: string): string {
  if (!key) {
    throw new Error('No key given');
  }

  if (_.isNull(ConfigValues) || !_.isObject(ConfigValues)) {
    throw new Error(`No config exists for this environment (${env})`);
  }

  if (!_.has(ConfigValues, key)) {
    throw new Error(`Config has no key named ${key}`);
  }

  return _.get(ConfigValues, key);
}
