import { Routes } from '@angular/router';
import { ProductsComponent } from './components/products-area/products/products.component';
import { Page404Component } from './components/layout-area/page404/page404.component';
import { ProductDetailsComponent } from './components/products-area/product-details/product-details.component';

export const routes: Routes = [
    // Catalog
    { path: "catalog", component: ProductsComponent },
    // Single product
    { path: "catalog/product/:id", component: ProductDetailsComponent },
    // Default catalog redirect
    { path: "", redirectTo: "/catalog", pathMatch: "full" },

    // Lazy load CartPageComponent
    {
        path: 'cart', loadComponent: () => import('./components/cart/cart-page.component').then(m => m.CartPageComponent)
    },
    // 404 fallback
    { path: "**", component: Page404Component }
];