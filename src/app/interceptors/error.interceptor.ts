import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {

  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        // retry(1),
        catchError((error: HttpErrorResponse) => {
          window.alert(`${error.status} - ${error.error}`);

          // обработать ошибку 401 Unauthorized, когда куки протухли, то нужно разлогинить
          if (error.status === 401) {
            this.authService.logout()
              .subscribe((response) => {
                this.authService.removeCurrentUser();
                this.router.navigate(['/login']);
              });
          }

          return throwError(() => {
            return error;
          });
        })
      );
  }
}
