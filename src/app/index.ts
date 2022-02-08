import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { HttpInterceptors } from './http-interceptors';

export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptors, multi: true }
];