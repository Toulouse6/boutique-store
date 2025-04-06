import { Injectable } from '@angular/core';
import ProductModel from '../models/product.model';
import { HttpClient } from '@angular/common/http';
import { appConfig } from '../app.config';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';

// Service available globally
@Injectable({
    providedIn: 'root'
})

export class ProductsService {

    public constructor(private http: HttpClient) { }

    // Image base-url
    private readonly baseImageUrl = 'https://fedtest.bylith.com/api/imager.php';

    // Generate full image URL
    public getImageUrl(imagePath: string): string {
        return `${this.baseImageUrl}?url=${imagePath}&type=fit&width=1000&height=1000&quality=70`;
    }

    // Fetch locally vs. live page
    private getApiUrl(endpoint: string): string {
        const base = environment.useCorsProxy ? 'https://cors-anywhere.herokuapp.com/' : '';
        return `${base}${endpoint}`;
    }

    // Fetch all products
    public async getAllProducts(): Promise<ProductModel[]> {
        try {
            const url = this.getApiUrl(appConfig.productsUrl);
            const response = await firstValueFrom(this.http.get<any>(url));
            return Array.isArray(response?.data) ? response.data : [];
        } catch (error) {
            console.error("Error fetching products:", error);
            return []; // Return empty when fails
        }
    }

    // Fetch one product by ID
    public async getOneProduct(id: number): Promise<ProductModel | null> {
        try {
            const url = this.getApiUrl(`${appConfig.productUrl}?id=${id}`);
            const response = await firstValueFrom(this.http.get<{ type: number; data: ProductModel }>(url));
            return response.data ?? null;
        } catch (error) {
            console.error(`Error fetching product with ID ${id}:`, error);
            return null;
        }
    }

    // Get available colors from product attributes
    public getAvailableColors(product: ProductModel) {

        const colorAttrs = product.attributes?.filter(attr =>
            attr.title?.toLowerCase().includes('color')
        );
        const labels = colorAttrs?.[0]?.labels || [];
        return labels;
    }

    // Extract available size
    getAvailableSizes(product: ProductModel) {
        const sizeAttrs = product.attributes?.filter(attr =>
            ['size', 'waist', 'length', 'fit'].some(keyword =>
                attr.title?.toLowerCase().includes(keyword)
            )
        );
        const labels = sizeAttrs?.[0]?.labels || [];
        return labels;
    }

    // Extract fabric options
    getAvailableFabrics(product: ProductModel) {

        const fabricAttrs = product.attributes?.filter(attr =>
            attr.title?.toLowerCase().includes('fabric')
        );
        const labels = fabricAttrs?.[0]?.labels || [];
        return labels;
    }

    // Pagination - return current page + total pages
    public getPaginatedProducts(products: ProductModel[], currentPage: number, itemsPerPage: number) {
        const totalPages = Math.ceil(products.length / itemsPerPage);
        const startIndex = (currentPage - 1) * itemsPerPage;
        const displayedProducts = products.slice(startIndex, startIndex + itemsPerPage);

        return { displayedProducts, totalPages };
    }
}