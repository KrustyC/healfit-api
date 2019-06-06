import connectToDb from '../bootstrap/dbconnection';
import config from '../config';
import Runner from './runner';

try {
  connectToDb(config);
  const runner = new Runner();

  Promise.resolve(runner.run()).then(() => {
    // tslint:disable-next-line:no-console
    console.log('[MIGRATIONS] done');
    process.exit(0);
  });
} catch (e) {
  // tslint:disable-next-line:no-console
  console.error('Migration failed', e);
  process.exit(0);
}
