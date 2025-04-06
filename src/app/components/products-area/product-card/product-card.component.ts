import { Component, Input, Pipe } from '@angular/core';
import ProductsModel from '../../../models/product.model';
import { Router, RouterLink } from '@angular/router';
import { ProductsService } from '../../../services/products.service';
import { CommonModule, NgIf, SlicePipe } from '@angular/common';

@Component({
    selector: 'app-product-card',
    standalone: true,
    imports: [RouterLink, SlicePipe, CommonModule],
    templateUrl: './product-card.component.html',
    styleUrl: './product-card.component.css'
})
export class ProductCardComponent {

    // Injecting service & navigation Router:
    public constructor(
        private productService: ProductsService,
        private router: Router
    ) { }

    // Input receive data from parent
    @Input()
    public product: ProductsModel;

    // Get the first image URL
    public getProductImage(): string {
        return this.productService.getImageUrl(this.product.images[0]?.url);
    }

    // Calculate discount
    public getSale(): number | null {
        if (this.product.max_price > this.product.min_price) {
            return ((this.product.max_price - this.product.min_price) / this.product.max_price) * 100;
        } else {
            this.product.max_price = 0;
            return null;
        }
    }

}