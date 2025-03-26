import { Routes } from '@angular/router';
import { ProductsComponent } from './components/products-area/products/products.component';
import { Page404Component } from './components/layout-area/page404/page404.component';
import { ProductDetailsComponent } from './components/products-area/product-details/product-details.component';

export const routes: Routes = [
    { path: "catalog", component: ProductsComponent },
    { path: "catalog/product/:id", component: ProductDetailsComponent },
    { path: "", redirectTo: "/catalog", pathMatch: "full" },
    {
        path: 'cart', loadComponent: () => import('./components/cart/cart-page.component').then(m => m.CartPageComponent)
    },
    { path: "**", component: Page404Component }
];