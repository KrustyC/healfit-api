import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import http from 'http';
import { ApolloServer, gql } from 'apollo-server-express';
import jwt from 'express-jwt';
import morgan from 'morgan';
import compression from 'compression'
import connectToDb from './dbconnection';
import router from './routes';
import schema from '../graphql/schema'

const app = express();

// initialise middleware
app.use(cors())
app.use(compression())
// app.use(bodyParser.json())

// const isDevelopment = config('env') === 'development'
const isDevelopment = true

// const jwtCheck = jwt({ secret: config('jwtSecret') })
// app.use(jwtCheck)


if (isDevelopment) {
  app.use(morgan('dev'))
}
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ type: '*/*', limit: '50mb' }));

export function startAPI(config: any) {
  connectToDb(config);

  const instance = process.env.NODE_APP_INSTANCE || '0';
  const port = parseInt(config('API_PORT'), 10) + parseInt(instance, 10);
  const server = new ApolloServer({ schema });
  
  server.applyMiddleware({ app, path: '/graphql' })

  app.listen({ port }, () =>
    console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`)
  )

  console.log('Server listening on: ', port);
}

export const api = app;
