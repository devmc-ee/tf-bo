import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(
      request.clone({
        setHeaders: {
          authorization: `Bearer ${this.authService.getToken()}`
        }
      }
      )).pipe(
        tap({
          next: (event) => {
            if (event instanceof HttpResponse) {
              if (event.status === 401) {
                this.authService.logout();
              }
            }
            return event;
          },
          error: (error) => {
            if (error.status === 401) {
              if ((error as HttpErrorResponse).error.message === 'TokenExpiredError') {
                this.authService.refreshToken().subscribe({
                  next: (data) => {
                    console.log('Access token refreshed');
                    this.authService.setAccessToken((data as { accessToken: string }).accessToken);
                  },
                  error: (error) => {
                    console.log('Failed to refresh access', error)
                    this.authService.logout()
                  },
                });
              } else {
                this.authService.logout();
                return;
              }
            }
            return;
          }
        })
      );
  }
}
