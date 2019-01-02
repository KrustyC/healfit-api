import express, { Request } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { ApolloServer } from 'apollo-server-express';
import morgan from 'morgan';
import compression from 'compression';
import config from 'config';
import jwt from 'express-jwt';
import connectToDb from './dbconnection';
import schema from '../graphql/schema';
import context from './context';

const app = express();

// initialise middleware
app.use(cors());
app.use(compression());
app.use(bodyParser.json());

// const isDevelopment = config('env') === 'development'
const isDevelopment = true;

if (isDevelopment) {
  app.use(morgan('dev'));
}

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ type: '*/*', limit: '50mb' }));

const authMiddleware = jwt({
  secret: config('jwtSecret'),
  credentialsRequired: false
});

app.use(authMiddleware);

export function startAPI(config: any) {
  connectToDb(config);

  const instance = process.env.NODE_APP_INSTANCE || '0';
  const port = parseInt(config('API_PORT'), 10) + parseInt(instance, 10);
  const server = new ApolloServer({
    schema,
    context
  });

  server.applyMiddleware({ app, path: '/graphql' });

  app.listen({ port }, () =>
    console.log(
      `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
    )
  );

  console.log('Server listening on: ', port);
}

export const api = app;
