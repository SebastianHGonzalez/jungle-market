/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();
const express = require('express');
const next = require('next');
const proxy = require('express-http-proxy');

const http = require('http');

const getConfig = require('./next.config.js');

const {
  jungleMarketQueryApiEndpoint,
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

  .then((server) => {
    server.use(
      '/graphql',
      proxy(jungleMarketQueryApiEndpoint),
    );

    server.get('*', (req, res) => handle(req, res));
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
