import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { Product } from '../../model/product';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  cartItems: Product[] = [];
  totalCartPrice: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.calculateTotalPrice();
    });
  }

  calculateTotalPrice() {
    this.totalCartPrice = this.cartItems.reduce((acc, item) => {
      const totalPrice = item.price * (item.quantity || 1);
      return acc + totalPrice;
    }, 0);
  }

  updateQuantity(product: Product, newQuantity: number) {
    if (newQuantity > 0) {
      this.cartService.updateQuantity(product, newQuantity);
    }
  }

  removeFromCart(product: Product) {
    this.cartService.removeFromCart(product);
  }

  clearCart() {
    this.cartService.clearCart();
  }

  ngOnDestroy() {
    this.cartService.cartItems$.unsubscribe();
  }
}
