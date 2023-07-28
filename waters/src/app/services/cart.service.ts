import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: { product: Product, quantity: number }[] = [];

  constructor() { }

  addToCart(product: Product, quantity: number): void {
    const foundProduct = this.cart.find(item => item.product._id === product._id);

    if (foundProduct) {
      foundProduct.quantity += quantity;
    } else {
      this.cart.push({ product, quantity });
    }
  }

  getCart(): { product: Product, quantity: number }[] {
    return this.cart;
  }

  getTotalPrice(price_client: number): number {
    return this.cart.reduce((acc, item) => acc + (price_client * item.quantity), 0);
  }

  getTotalQuantity(): number {
    return this.cart.reduce((acc, item) => acc + item.quantity, 0);
  }

  clearCart(): void {
    this.cart = [];
  }

  
}
