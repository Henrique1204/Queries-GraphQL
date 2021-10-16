import { ApolloServer } from 'apollo-server';

import { typeDefs, resolvers } from './graphql/schema';
import context from './graphql/context';
import dataSources from './graphql/datasources';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  dataSources,
});

server.listen(4003).then(({ url }) => console.log(`Rodando na url: ${url}`));
