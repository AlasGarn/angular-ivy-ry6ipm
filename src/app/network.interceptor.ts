import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs';
import {LoadingService } from './services/loader.service';

@Injectable()
export class NetworkInterceptor implements NetworkInterceptor {
  private totalRequests = 0;

  constructor(
    private loadingService: LoadingService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log('caught', request)
    this.totalRequests++;
    this.loadingService.setLoading(true);
    return next.handle(request).pipe(
      finalize(() => {
        this.totalRequests--;
        if (this.totalRequests == 0) {
          this.loadingService.setLoading(false);
        }
      })
    );
  }
}
/*  intercept(request: HttpRequest<unknown>, 
            next: HttpHandler): 
    Observable<HttpEvent<unknown>> {
      this.loader.show();
      return next.handle(request).pipe( finalize(() => { this.loader.hide(); }) );
    }
}*/
