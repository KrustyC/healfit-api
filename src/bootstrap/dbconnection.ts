import _ from 'lodash';

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

/**
 * Connect to the database
 *
 * @param  {Function} config
 */
export default function connectToDb(config: any) {
  const dbName = config('dbConfig.name');
  try {
    if (!_.isNull(config('dbConfig.connectionString'))) {
      mongoose.connect(config('dbConfig.connectionString'));
    } else {
      mongoose.connect(`mongodb://mongodb/${dbName}`);
    }
  } catch (e) {
    // eslint-disable-next-line
    console.log(`Error connecting to db: ${e}`);
  }
}
