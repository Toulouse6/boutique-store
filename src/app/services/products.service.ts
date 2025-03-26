import { Injectable } from '@angular/core';
import ProductModel from '../models/product.model';
import { HttpClient } from '@angular/common/http';
import { appConfig } from '../app.config';
import { firstValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {

    public constructor(private http: HttpClient) { }

    private readonly baseImageUrl = 'https://fedtest.bylith.com/api/imager.php';

    //  Get Images
    public getImageUrl(imagePath: string): string {
        return `${this.baseImageUrl}?url=${imagePath}&type=fit&width=1000&height=1000&quality=70`;
    }

    // Fetch all products
    public async getAllProducts(): Promise<ProductModel[]> {
        try {
            const observable = this.http.get<any>(appConfig.productsUrl);
            const response = await firstValueFrom(observable);
            return Array.isArray(response?.data) ? response.data : [];
        } catch (error) {
            console.error("Error fetching products:", error);
            return [];
        }
    }

    // Fetch one product
    public async getOneProduct(id: number): Promise<ProductModel | null> {
        try {
            const observable = this.http.get<{ type: number; data: ProductModel }>(
                `${appConfig.productUrl}?id=${id}`
            );
            const response = await firstValueFrom(observable);
            return response.data ?? null;
        } catch (error) {
            console.error(`Error fetching product with ID ${id}:`, error);
            return null;
        }
    }

    // Get colors
    public getAvailableColors(product: ProductModel) {
   
        const colorAttrs = product.attributes?.filter(attr => 
            attr.title?.toLowerCase().includes('color')
        );
        const labels = colorAttrs?.[0]?.labels || [];
        return labels;
    }

    // Get sizes
    getAvailableSizes(product: ProductModel) {
        const sizeAttrs = product.attributes?.filter(attr => 
            ['size', 'waist', 'length', 'fit'].some(keyword => 
                attr.title?.toLowerCase().includes(keyword)
            )
        );
        const labels = sizeAttrs?.[0]?.labels || [];
        return labels;
    }

    // Get fabrics
    getAvailableFabrics(product: ProductModel) {

        const fabricAttrs = product.attributes?.filter(attr => 
            attr.title?.toLowerCase().includes('fabric')
        );
        const labels = fabricAttrs?.[0]?.labels || [];
        return labels;
    }

    // Pagination
    public getPaginatedProducts(products: ProductModel[], currentPage: number, itemsPerPage: number) {
        const totalPages = Math.ceil(products.length / itemsPerPage);
        const startIndex = (currentPage - 1) * itemsPerPage;
        const displayedProducts = products.slice(startIndex, startIndex + itemsPerPage);

        return { displayedProducts, totalPages };
    }
}