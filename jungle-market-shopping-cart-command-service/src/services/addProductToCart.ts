import { model } from 'mongoose';

const ShoppingCart = model('ShoppingCart');

export default function addProductToCart(customerId: string, skuId: string) {
  return ShoppingCart.findOneAndUpdate(
    { customerId },
    { $push: { products: skuId } },
    { new: true, upsert: true },
  );
}
