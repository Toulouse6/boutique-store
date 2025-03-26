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
    public products: ProductsModel[] = [];
    public displayedProducts: ProductsModel[] = [];
    public itemsPerPage: number = 12;
    public currentPage: number = 1;
    public totalPages: number = 1;

    constructor(private title: Title, private productsService: ProductsService) { }

    ngOnInit(): void {
        this.updateItemsPerPage();

        // Get all products 
        if (!this.products.length) {
            this.productsService.getAllProducts()
                .then(products => {
                    this.products = products;
                    this.updatePagination();
                })
                .catch(error => console.error("Failed to load products:", error));
        }
    }

    // Items per page

    @HostListener('window:resize', ['$event'])
    updateItemsPerPage() {
        this.itemsPerPage = window.innerWidth <= 1024 ? 6 : 8;
        this.updatePagination();
    }

    updatePagination() {
        const { displayedProducts, totalPages } = this.productsService.getPaginatedProducts(
            this.products, this.currentPage, this.itemsPerPage
        );

        this.displayedProducts = displayedProducts;
        this.totalPages = totalPages;
    }

    goToPreviousPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.updatePagination();
        }
    }

    goToNextPage() {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
            this.updatePagination();
        }
    }

    // Go to page
    goToPage(page: number) {
        this.currentPage = page;
        this.updatePagination();
    }
}
