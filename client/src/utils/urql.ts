import { Client, cacheExchange, createClient, fetchExchange } from "urql/core";

let _client: Client | null = null;

export const getUrqlClient = () => {
  if (!_client) {
    _client = createClient({
      url:
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/graphql` ||
        "http://localhost:1337/graphql",
      requestPolicy: "cache-and-network",
      exchanges: [cacheExchange, fetchExchange],
    });
  }
  const client = _client;
  return { client };
};
