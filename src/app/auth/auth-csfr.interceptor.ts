import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpXsrfTokenExtractor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthCsfrInterceptor implements HttpInterceptor {

  constructor(private readonly tokenExtractor: HttpXsrfTokenExtractor ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const tokenHeader =  'X-XSRF-TOKEN';

    const token = this.tokenExtractor.getToken();
    if (token !== null && !(request.headers.has(tokenHeader))) {
      request = request.clone({ headers: request.headers.set(tokenHeader, token)});
    }

    return next.handle(request);
  }
}
