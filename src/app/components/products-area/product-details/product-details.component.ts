import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ProductsService } from '../../../services/products.service';
import ProductModel from '../../../models/product.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../../services/cart.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-product-details',
    standalone: true,
    imports: [RouterLink, CommonModule, NgIf, FormsModule, MatButtonModule],
    templateUrl: './product-details.component.html',
    styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {

    public product: ProductModel | null = null;

    // User-selected quantity
    public quantity: number = 1;

    // Dropdown options
    public colorOptions: { label_id: string; title: string }[] = [];
    public sizeOptions: { label_id: string; title: string }[] = [];
    public fabricOptions: { label_id: string; title: string }[] = [];

    // Selected values for dropdowns
    public selectedColor: string = '';
    public selectedSize: string = '';
    public selectedFabric: string = '';

    // Color circles under image
    public availableColors: { label_id: string; title: string; data?: string }[] = [];

    // Slider logic
    public currentImageIndex: number = 0;
    private interval: any;

    constructor(
        private title: Title,
        private productService: ProductsService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private cartService: CartService
    ) { }

    // Initialization
    async ngOnInit(): Promise<void> {
        try {
            const id = +this.activatedRoute.snapshot.params['id'];
            this.product = await this.productService.getOneProduct(id);

            if (!this.product) {
                alert("Product not found.");
                return;
            }

            this.title.setTitle("Boutique Toulouse | " + this.product.title);

            // Set options according to attributes
            const colorAttr = this.product.attributes.find(attr =>
                attr.title.toLowerCase() === 'color'
            );
            const sizeAttr = this.product.attributes.find(attr =>
                ['size', 'waist size'].some(s => attr.title.toLowerCase().includes(s))
            );
            const fabricAttr = this.product.attributes.find(attr =>
                attr.title.toLowerCase() === 'fabric type'
            );

            // Set dropdown values
            this.colorOptions = colorAttr?.labels || [];
            this.sizeOptions = sizeAttr?.labels || [];
            this.fabricOptions = fabricAttr?.labels || [];

            // Auto-select if only one option available
            if (this.colorOptions.length === 1) {
                this.selectedColor = this.colorOptions[0].label_id;
            }
            if (this.sizeOptions.length === 1) {
                this.selectedSize = this.sizeOptions[0].label_id;
            }
            if (this.fabricOptions.length === 1) {
                this.selectedFabric = this.fabricOptions[0].label_id;
            }

            // Get available colors
            this.availableColors = this.productService.getAvailableColors(this.product);

            // Start auto-sliding
            this.startAutoSlide();
        } catch (err: any) {
            alert("Error loading product: " + err.message);
        }
    }

    // Get the current product image
    public getProductImage(): string {
        return this.productService.getImageUrl(this.product?.images[this.currentImageIndex]?.url);
    }

    // Slideshow
    private startAutoSlide(): void {
        this.interval = setInterval(() => {
            if (this.product) {
                this.currentImageIndex = (this.currentImageIndex + 1) % this.product.images.length;
            }
        }, 4000);
    }

    // Quantity
    increaseQuantity() {
        this.quantity++;
    }

    decreaseQuantity() {
        if (this.quantity > 1) this.quantity--;
    }


    // Add to cart
    addToCart(): void {
        if (!this.product) return;

        // Ensure first option is selected
        const color = this.selectedColor ||
            (this.colorOptions.length > 0 ? this.colorOptions[0].label_id : '—');
        const size = this.selectedSize ||
            (this.sizeOptions.length > 0 ? this.sizeOptions[0].label_id : '—');
        const fabric = this.selectedFabric ||
            (this.fabricOptions.length > 0 ? this.fabricOptions[0].label_id : '—');

        // Validation
        if (this.colorOptions.length > 0 && !color) {
            alert("Please select a color.");
            return;
        }
        if (this.sizeOptions.length > 0 && !size) {
            alert("Please select a size.");
            return;
        }
        if (this.fabricOptions.length > 0 && !fabric) {
            alert("Please select a fabric.");
            return;
        }

        // Add to cart via service
        this.cartService.addToCart(this.product, this.quantity, color, size, fabric);

        alert("Added to cart!");
        // Navigate
        this.router.navigate(['/catalog']);
    }


}
