import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private toastr: ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error => {
        if (error) {
          switch(error.status) {
            case 400:
              if (error.error.errors) {
                const modalStateErrors = [];
                for (const key in error.error.errors) {
                  if (error.error.errors[key]) {
                    modalStateErrors.push(error.error.errors[key])
                  }
                }
                throw modalStateErrors.flat(); //Makes array with arrays inside flat
              } else {
                this.toastr.error(error.statusText === "OK" ? "BadRequest" : error.statusText, error.status);
              }
              break;

            case 401:
              this.toastr.error(error.statusText === "OK" ? "Unauthorize" : error.statusText,error.status);
              break;

            case 404:
              this.router.navigateByUrl('/not-found');
              break;

            case 500:
              const navigationExtras: NavigationExtras = {state: {error: error.error}}; //Adding the error to router state, to hold it and show in other component
              this.router.navigateByUrl('/server-error', navigationExtras);
              break;

              default:
                this.toastr.error('Something went wrong');
                console.log(error);
                break;
          }
        }
        return throwError(error);
      })
    );
  }
}
