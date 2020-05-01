/* eslint-disable @typescript-eslint/no-var-requires */
const express = require('express');
const next = require('next');
const { ApolloServer } = require('apollo-server-express');

const http = require('http');

const graphQLSchema = require('./graphql');
const getConfig = require('../next.config.js');

const {
  PORT,
  ENV,
} = getConfig.serverRuntimeConfig;

const dev = ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => express())

  .then((server) => {
    server.use(express.json({ extended: true, limit: '50mb' }));
    return server;
  })

  .then((server) => {
    server.use(
      express.urlencoded({
        extended: true,
        parameterLimit: 100000,
        limit: '50mb',
      }),
    );

    return server;
  })

  .then(async (server) => {
    const schema = await graphQLSchema();

    const apolloServer = new ApolloServer({
      schema,
    });

    apolloServer.applyMiddleware({ app: server, path: '/graphql' });

    server.use(handle);
    return server;
  })

  .then(async (server) => {
    const httpServer = http.createServer(server);

    httpServer.listen(PORT, (err) => {
      if (err) throw err;
      console.log(`Running in ${ENV} mode`);
      console.log(`> Server ready on http://localhost:${PORT}`);
    });

    return server;
  })

  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
