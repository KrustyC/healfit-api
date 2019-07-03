import mongoose from 'mongoose';

const isCI = process.env.NODE_ENV === 'ci';
const host = isCI ? 'localhost:27018' : 'mongodbtest';

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

after(async () => {
  const collections = await mongoose.connection.db.collections();

  for (const collection of collections) {
    await collection.deleteMany({});
  }
});

after(done => {
  mongoose.disconnect();
  return done();
});
