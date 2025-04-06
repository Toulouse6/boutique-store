import { Component } from '@angular/core';
import { CartService, CartItem } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../services/products.service';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from '../layout-area/header/header.component';

@Component({
    selector: 'app-cart-page',
    standalone: true,
    imports: [HeaderComponent, CommonModule, MatButtonModule],
    templateUrl: './cart-page.component.html',
    styleUrl: './cart-page.component.css'
})
export class CartPageComponent {

    cartItems: CartItem[];

    constructor(
        private cartService: CartService,
        public productService: ProductsService
    ) {
        this.cartItems = this.cartService.getCart();
    }

    // Clear Cart
    clearCart(): void {
        const confirmed = confirm("Are you sure?");
        if (confirmed) {
            this.cartService.clearCart();
            this.cartItems = [];
        }
    }

    // Gey Total
    getTotal(): number {
        return this.cartItems.reduce((total, item) => {
            return total + item.product.min_price * item.quantity;
        }, 0);
    }
}