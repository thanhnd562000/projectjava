import { Cart } from './cart.model';

export class OrderItem {
  imageUrl: string;
  unitPrice: number;
  quantity: number;
  productId: string;

  constructor(cartItem: Cart) {
    this.imageUrl = cartItem.imageUrl;
    this.quantity = cartItem.quantity;
    this.productId = cartItem.id;
    this.unitPrice = cartItem.unitPrice;
  }
}
