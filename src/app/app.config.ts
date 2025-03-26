import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { IMAGE_CONFIG } from '@angular/common';
import { environment } from '../environments/environment';

export const appConfig = {
    // Injecting object at app level:
    providers: [
        provideRouter(routes),
        provideHttpClient(),
        {
            provide: IMAGE_CONFIG,
            useValue: {
                disableImageSizeWarning: true,
                disableImageLazyLoadWarning: true
            }
        }
    ],
    // Server urls:
    productsUrl: `${environment.apiUrl}/products`,
    productUrl: `${environment.apiUrl}/product`
};