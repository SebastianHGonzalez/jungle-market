export default function getConfig() {
  return {
    shoppingCartCommandService:
      process.env.JUNGLE_MARKET_SHOPPING_CART_COMMAND_SERVICE_ENDPOINT,
  };
}
