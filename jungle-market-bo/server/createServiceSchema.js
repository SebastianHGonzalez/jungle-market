/* eslint-disable @typescript-eslint/no-var-requires */
const fetch = require('isomorphic-unfetch');
const { setContext } = require('apollo-link-context');
const { createHttpLink } = require('apollo-link-http');
const {
  introspectSchema,
  makeRemoteExecutableSchema,
} = require('graphql-tools');

async function createServiceSchema(uri) {
  const serviceLink = createHttpLink({
    uri,
    fetch,
  });

  const link = setContext((request, previousContext) => {
    if (
      previousContext
      && previousContext.graphqlContext
      && previousContext.graphqlContext.token
    ) {
      return {
        headers: {
          Authorization: `Bearer ${previousContext.graphqlContext.token}`,
        },
      };
    }
    return {};
  }).concat(serviceLink);

  const schema = await introspectSchema(link);
  return makeRemoteExecutableSchema({
    schema,
    link,
  });
}

module.exports = createServiceSchema;
