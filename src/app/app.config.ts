import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { IMAGE_CONFIG } from '@angular/common';
import { environment } from '../environments/environment';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig = {
    // Global providers - App level
    providers: [
        provideRouter(routes),
        provideHttpClient(),

        // Handle image warnings
        {
            provide: IMAGE_CONFIG,
            useValue: {
                disableImageSizeWarning: true,
                disableImageLazyLoadWarning: true
            }
            // Enable asynchronos animations
        }, provideAnimationsAsync()
    ],

    // Server urls:
    productsUrl: `${environment.apiUrl}/catalog/getAll`, // All products
    productUrl: `${environment.apiUrl}/catalog/get` // Single product
};