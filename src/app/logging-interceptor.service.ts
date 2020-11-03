import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterveptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log(req.url);
        console.log('Request is on its way');

        return next.handle(req)
            .pipe(tap(event => { // optional, in case you want to modify your response. replace tap with map. tap is just used to lookinto the response
                if (event.type === HttpEventType.Response) {
                    console.log('Response arrived, body data: ');
                    console.log(event.body);
                }
            }));
    }
}