import {Injectable} from '@angular/core'
import {HttpRequest, HttpHandler, HttpEvent} from '@angular/common/http'
import {Observable} from 'rxjs'
import {finalize} from 'rxjs/operators'
import { NgxSpinnerService } from 'ngx-spinner'

@Injectable({
  providedIn: 'root'
})
export class LoaderInterceptorService {
  private activeRequests = 0

  public constructor(private spinner: NgxSpinnerService) {}

  public intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.activeRequests === 0) {
        this.spinner.show();
    }

    this.activeRequests++

    return next.handle(request).pipe(
      finalize(() => {
        this.activeRequests--
        if (this.activeRequests === 0) {
            this.spinner.hide();
        }
      })
    )
  }
}
