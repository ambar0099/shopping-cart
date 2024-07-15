import { Routes } from '@angular/router';
import { CartComponent } from './pages/cart/cart.component';
import { ShopComponent } from './pages/shop/shop.component';
CartComponent
export const routes: Routes = [
  { path: '', component: ShopComponent },
  { path: 'shop', component: ShopComponent },
  {
    path: 'cart', component: CartComponent
  }
];