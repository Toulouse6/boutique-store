import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { IMAGE_CONFIG } from '@angular/common';
import { environment } from '../environments/environment';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

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
        }, provideAnimationsAsync()
    ],
    // Server urls:
    productsUrl: `${environment.apiUrl}/catalog/getAll`,
  productUrl: `${environment.apiUrl}/catalog/get`
};