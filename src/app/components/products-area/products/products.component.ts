import { Component, OnInit, HostListener } from '@angular/core';
import { Title } from '@angular/platform-browser';
import ProductsModel from '../../../models/product.model';
import { ProductsService } from '../../../services/products.service';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card.component';
import { HeaderComponent } from "../../layout-area/header/header.component";

@Component({
    selector: 'app-products',
    standalone: true,
    imports: [CommonModule, ProductCardComponent, HeaderComponent],
    templateUrl: './products.component.html',
    styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

    // Fetch all products
    public products: ProductsModel[] = [];

    // Currently visible products
    public displayedProducts: ProductsModel[] = [];

    // Pagination settings
    public itemsPerPage: number = 12;
    public currentPage: number = 1;
    public totalPages: number = 1;

    constructor(private title: Title, private productsService: ProductsService) { }

    // Initialization
    ngOnInit(): void {
        this.updateItemsPerPage();

        // Load all products if not already loaded
        if (!this.products.length) {
            this.productsService.getAllProducts()
                .then(products => {
                    this.products = products;

                    // Show first page
                    this.updatePagination();
                })
                .catch(error => console.error("Failed to load products:", error));
        }
    }

    // Dynamically adjust number items per page on resize
    @HostListener('window:resize', ['$event'])
    updateItemsPerPage() {
        this.itemsPerPage = window.innerWidth <= 1024 ? 6 : 8;
        this.updatePagination();
    }

    // Update pagination based on currentPage & itemsPerPage
    updatePagination() {
        const { displayedProducts, totalPages } = this.productsService.getPaginatedProducts(
            this.products, this.currentPage, this.itemsPerPage
        );

        this.displayedProducts = displayedProducts;
        this.totalPages = totalPages;
    }

    // Previous page if possible
    goToPreviousPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.updatePagination();
        }
    }

    // Next page if possible
    goToNextPage() {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
            this.updatePagination();
        }
    }

    // Jump directly to page
    goToPage(page: number) {
        this.currentPage = page;
        this.updatePagination();
    }
}
