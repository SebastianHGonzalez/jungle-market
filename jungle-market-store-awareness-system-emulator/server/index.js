const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const { createProxyMiddleware } = require('http-proxy-middleware');

const http = require('http');

const getConfig = require('../next.config.js');

const {
  PLANNED_ROUTES_SERVICE,
  PORT,
  ENV,
  JWT_PUBLIC_KEY_PATH,
} = getConfig.serverRuntimeConfig;
const { COOKIE_NAME, COOKIE_NAME_ALTERNATIVE } = getConfig.publicRuntimeConfig;

const dev = ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => express())

  .then((server) => {
    server.use(bodyParser.json({ extended: true, limit: '50mb' }));
    return server;
  })

  .then((server) => {
    server.use(
      bodyParser.urlencoded({
        extended: true,
        parameterLimit: 100000,
        limit: '50mb',
      }),
    );

    return server;
  })

  .then((server) => {
    server.use(cookieParser());
    return server;
  })

  .then((server) => {
    server.use(
      '/api',
      createProxyMiddleware({
        target: PLANNED_ROUTES_SERVICE,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      }),
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
