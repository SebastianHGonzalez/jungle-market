import { model } from 'mongoose';

const ShoppingCart = model('ShoppingCart');

export default function addProductToCart(ownerId: string, skuId: string) {
  return ShoppingCart.findOneAndUpdate(
    { ownerId },
    { $push: { products: skuId } },
    { new: true, upsert: true },
  );
}
