import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
import { typeDefs } from './graphql/typeDefs.js';
import { resolvers } from './graphql/resolvers/authResolvers.js';
import { context } from './context/authContext.js';

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
});

await server.start();
server.applyMiddleware({ app });

await mongoose.connect(process.env.MONGO_URI!);
app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
