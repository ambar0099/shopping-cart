import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CartService } from '../../services/cart.service';
import { Product } from '../../model/product';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  products: Product[] = [];

  constructor(private http: HttpClient, private cartService: CartService) { }

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
    this.http.get<Product[]>('https://dummyjson.com/products?limit=50').subscribe(
      (data: any) => {
        this.products = data.products;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
