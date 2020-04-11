export default function getConfig() {
  return {
    shoppingCartQueryService:
      process.env.JUNGLE_MARKET_SHOPPING_CART_QUERY_SERVICE_ENDPOINT,
  };
}
