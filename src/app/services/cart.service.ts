import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: Product[] = [];
  cartItems$ = new BehaviorSubject<Product[]>(this.cartItems);

  get totalItems$() {
    return this.cartItems$.asObservable().pipe(
      map(items => items.reduce((acc, item) => acc + (item.quantity || 0), 0))
    );
  }

  addToCart(product: Product) {
    const existingItem = this.cartItems.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity = (existingItem.quantity || 0) + 1;
    } else {
      product.quantity = 1;
      this.cartItems.push(product);
    }
    this.cartItems$.next(this.cartItems);
  }

  updateQuantity(product: Product, quantity: number) {
    const index = this.cartItems.findIndex(item => item.id === product.id);
    if (index !== -1) {
      this.cartItems[index].quantity = quantity;
      this.cartItems$.next(this.cartItems);
    }
  }

  removeFromCart(product: Product) {
    this.cartItems = this.cartItems.filter(item => item.id !== product.id);
    this.cartItems$.next(this.cartItems);
  }

  clearCart() {
    this.cartItems = [];
    this.cartItems$.next(this.cartItems);
  }
}
