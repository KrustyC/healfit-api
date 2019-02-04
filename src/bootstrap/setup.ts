import { ApolloServer } from 'apollo-server-express';
import bodyParser from 'body-parser';
import compression from 'compression';
import config from 'config';
import cors from 'cors';
import express, { Request } from 'express';
import jwt from 'express-jwt';
import morgan from 'morgan';
import path from 'path';
import schema from '../graphql/schema';
import context from './context';
import connectToDb from './dbconnection';

const app = express();

// initialise middleware
app.use(cors());
app.use(compression());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '/../public')));

// const isDevelopment = config('env') === 'development'
const isDevelopment = true;

if (isDevelopment) {
  app.use(morgan('dev'));
}

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ type: '*/*', limit: '50mb' }));

const authMiddleware = jwt({
  credentialsRequired: false,
  secret: config('jwtSecret'),
});

app.use(authMiddleware);

export function startAPI(configuration: any) {
  connectToDb(configuration);

  const instance = process.env.NODE_APP_INSTANCE || '0';
  const port = parseInt(config('API_PORT'), 10) + parseInt(instance, 10);

  // @TODO move this stuff and schemaDirectives to graphql folder
  const server = new ApolloServer({
    context,
    schema,
  });

  server.applyMiddleware({ app, path: '/graphql' });

  app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, '/../public/index.html'));
  });

  app.listen({ port }, () =>
    // tslint:disable-next-line
    console.log(
      `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
    )
  );
}

export const api = app;
