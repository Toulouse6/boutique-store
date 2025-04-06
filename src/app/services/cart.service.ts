import { Injectable } from '@angular/core';
import ProductModel from '../models/product.model';

// Cart item interface
export interface CartItem {
    product: ProductModel;
    quantity: number;
    color: string;
    size: string;
    fabric: string;
}

// Key for storing cart in localStorage
const CART_KEY = 'boutiqueCart';

// Service available app-wide
@Injectable({
    providedIn: 'root'
})
export class CartService {
    // Internal cart array
    private cart: CartItem[] = [];

    constructor() {
        this.loadCartFromStorage();
    }

    // Get all cart items
    getCart(): CartItem[] {
        return this.cart;
    }

    // Add an item to cart
    addToCart(product: ProductModel, quantity: number, color: string, size: string, fabric: string): void {
        color = color || '—';
        size = size || '—';
        fabric = fabric || '—';

        // Check if product variant already exists
        const existingItem = this.cart.find(item =>
            item.product.id === product.id &&
            item.color === color &&
            item.size === size &&
            item.fabric === fabric
        );

        // If found, increase quantity, else add new
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.cart.push({ product, quantity, color, size, fabric });
        }

        // Save to localStorage
        this.saveCartToStorage();
    }


    // Clear cart
    clearCart(): void {
        this.cart = [];
        this.saveCartToStorage();
    }

    // Save cart to localStorage 
    private saveCartToStorage(): void {
        try {
            const cartData = this.cart.map(item => ({
                product: {
                    id: item.product.id,
                    title: item.product.title,
                    min_price: item.product.min_price,
                    images: item.product.images,
                    attributes: item.product.attributes
                },
                quantity: item.quantity,
                color: item.color,
                size: item.size,
                fabric: item.fabric
            }));
            localStorage.setItem(CART_KEY, JSON.stringify(cartData));
        } catch (err) {
            console.error('Failed to save cart to localStorage:', err);
        }
    }

    // Load cart from storage
    private loadCartFromStorage(): void {
        try {
            const data = localStorage.getItem(CART_KEY);
            if (data) {
                const rawItems = JSON.parse(data);
                this.cart = rawItems.map((item: any) => ({
                    product: new ProductModel(item.product),
                    quantity: item.quantity,
                    color: item.color || '—',
                    size: item.size || '—',
                    fabric: item.fabric || '—'
                }));
            }
        } catch (err) {
            console.error('Failed to load cart from localStorage:', err);
            this.cart = [];
        }
    }
}