/* eslint-disable @typescript-eslint/no-var-requires */
const { mergeSchemas } = require('graphql-tools');

const createServiceSchema = require('./createServiceSchema');

const getConfig = require('../next.config.js');

const { jungleMarketCommandApiEndpoint } = getConfig.serverRuntimeConfig;

// To add more schemas copy createServiceSchema and modify enpoint, then add new schema to merge array
const createSchema = async () => mergeSchemas({
  schemas: [await createServiceSchema(jungleMarketCommandApiEndpoint)],
});

module.exports = createSchema;
