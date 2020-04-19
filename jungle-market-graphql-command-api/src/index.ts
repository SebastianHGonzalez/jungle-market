import {
  introspectSchema,
  makeRemoteExecutableSchema,
  ApolloServer,
} from 'apollo-server';
import { HttpLink } from 'apollo-link-http';
import fetch from 'node-fetch';

import getConfig from './config';

(async () => {
  const { shoppingCartCommandService } = getConfig();

  const link = new HttpLink({
    uri: shoppingCartCommandService,
    fetch: fetch as never,
  });

  const schema = await introspectSchema(link);

  const executableSchema = makeRemoteExecutableSchema({
    schema,
    link,
  });

  const server = new ApolloServer({ schema: executableSchema });

  server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
})();
