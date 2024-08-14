import express, { Response } from 'express';
import { ApolloServer } from 'apollo-server-express';
import path from 'path';
import dotenv from 'dotenv';
import db from './config/connection';
import { typeDefs, resolvers } from './schemas';
import { authMiddleware } from './utils/auth';

dotenv.config();
const PORT = process.env.PORT;
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../client/build')));
}

app.get('/', (_, res: Response) => {
  res.sendFile(path.join(__dirname, '../../client/build/index.html'));
});

app.get('*', (_, res: Response) => {
  res.sendFile(path.join(__dirname, '../../client/build/index.html'));
});

const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
};

startApolloServer();
