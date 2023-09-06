import { Injectable } from '@angular/core';
import { HttpRequest,HttpHandler, HttpEvent,HttpInterceptor, HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { LoadingService } from './loading.service';
import {catchError,finalize} from 'rxjs/operators';

@Injectable()

export class NetworkInterceptor implements HttpInterceptor {

  constructor(private loader:LoadingService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loader.show();
    return next.handle(request).pipe(
       catchError((error: HttpErrorResponse) => {
        let errorMsg = '';
        if (error.error instanceof ErrorEvent) {
           errorMsg = `Error: ${error.error.message}`;
        } else {
           errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
        }
        return throwError(() =>errorMsg);
     }),
     finalize(() => {
      this.loader.hide();
     })
    );
  }
}


