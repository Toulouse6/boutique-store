import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ProductsService } from '../../../services/products.service';
import ProductModel from '../../../models/product.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../../services/cart.service';

@Component({
    selector: 'app-product-details',
    standalone: true,
    imports: [RouterLink, CommonModule, NgIf, FormsModule],
    templateUrl: './product-details.component.html',
    styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {

    public product: ProductModel | null = null;
    public quantity: number = 1;

    public colorOptions: { label_id: string; title: string }[] = [];
    public sizeOptions: { label_id: string; title: string }[] = [];
    public fabricOptions: { label_id: string; title: string }[] = [];

    public selectedColor: string = '';
    public selectedSize: string = '';
    public selectedFabric: string = '';
    public availableColors: { label_id: string; title: string; data?: string }[] = [];

    // Slider Variables
    public currentImageIndex: number = 0;
    private interval: any;

    constructor(
        private title: Title,
        private productService: ProductsService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private cartService: CartService
    ) { }

    async ngOnInit(): Promise<void> {
        try {
            const id = +this.activatedRoute.snapshot.params['id'];
            this.product = await this.productService.getOneProduct(id);

            if (!this.product) {
                alert("Product not found.");
                return;
            }

            this.title.setTitle("Boutique Toulouse | " + this.product.title);

            const colorAttr = this.product.attributes.find(attr =>
                attr.title.toLowerCase() === 'color'
            );
            const sizeAttr = this.product.attributes.find(attr =>
                ['size', 'waist size'].some(s => attr.title.toLowerCase().includes(s))
            );
            const fabricAttr = this.product.attributes.find(attr =>
                attr.title.toLowerCase() === 'fabric type'
            );

            // Set options type
            this.colorOptions = colorAttr?.labels || [];
            this.sizeOptions = sizeAttr?.labels || [];
            this.fabricOptions = fabricAttr?.labels || [];

            // Automatically select if only one option exists
            if (this.colorOptions.length === 1) {
                this.selectedColor = this.colorOptions[0].label_id;
            }
            if (this.sizeOptions.length === 1) {
                this.selectedSize = this.sizeOptions[0].label_id;
            }
            if (this.fabricOptions.length === 1) {
                this.selectedFabric = this.fabricOptions[0].label_id;
            }

            // Get colors
            this.availableColors = this.productService.getAvailableColors(this.product);
            this.startAutoSlide();
        } catch (err: any) {
            alert("Error loading product: " + err.message);
        }
    }

    // Images Slide
    public getProductImage(): string {
        return this.productService.getImageUrl(this.product?.images[this.currentImageIndex]?.url);
    }

    setImage(index: number): void {
        this.currentImageIndex = index;
        this.resetAutoSlide();
    }

    private startAutoSlide(): void {
        this.interval = setInterval(() => {
            if (this.product) {
                this.currentImageIndex = (this.currentImageIndex + 1) % this.product.images.length;
            }
        }, 4000);
    }

    private resetAutoSlide(): void {
        clearInterval(this.interval);
        this.startAutoSlide();
    }

    // Quantity
    increaseQuantity() {
        this.quantity++;
    }

    decreaseQuantity() {
        if (this.quantity > 1) this.quantity--;
    }


    addToCart(): void {
        if (!this.product) return;

        // Ensure first option is selected
        const color = this.selectedColor ||
            (this.colorOptions.length > 0 ? this.colorOptions[0].label_id : '—');
        const size = this.selectedSize ||
            (this.sizeOptions.length > 0 ? this.sizeOptions[0].label_id : '—');
        const fabric = this.selectedFabric ||
            (this.fabricOptions.length > 0 ? this.fabricOptions[0].label_id : '—');

        // Validation logic
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

        this.cartService.addToCart(this.product, this.quantity, color, size, fabric);

        alert("Added to cart!");
        this.router.navigate(['/catalog']);
    }


}
