import mongoose from 'mongoose';

const isCI = process.env.NODE_ENV === 'ci';
const host = isCI ? 'localhost:27018' : 'mongodb';

const dbName = 'mongodbtest';
const connectionString = `mongodb://${host}/${dbName}`;

mongoose.Promise = global.Promise;

before(done => {
  mongoose.connect(connectionString);
  mongoose.connection
    .once('open', () => {
      done();
    })
    .on('error', err => {
      // tslint:disable-next-line:no-console
      console.warn(`Error connecting to db: ${err}`);
    });
});

afterEach(done => {
  mongoose.disconnect();
  return done();
});
