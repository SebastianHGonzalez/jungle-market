import { model } from 'mongoose';

const ShoppingCart = model('ShoppingCart');

export default function addProductToCart(clientId: string, skuId: string) {
  return ShoppingCart.create({
    ownerId: clientId,
    products: [skuId],
  });
}
