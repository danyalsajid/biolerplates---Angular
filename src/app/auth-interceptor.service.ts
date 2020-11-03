import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpEvent,
    HttpHandler,
    HttpRequest,
    HttpEventType,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        // console.log(req.url); 
        // if(req.url) {} // block or perform specific function upon any url here

        const modifiedRequest = req.clone({ // set headers or params here
            headers: req.headers.append('Auth', 'xyz')
        });

        return next.handle(modifiedRequest);

        // optional: in case you want to modify your response. replace tap with map. tap is just used to lookinto the response
        // or use multiple interceptor to modify your response - used LoggingInterceptor in this project
        // return next.handle(modifiedRequest) 
        //     .pipe(tap(event => { 
        //         if (event.type === HttpEventType.Response) {
        //             console.log('Response arrived, body data: ');
        //             console.log(event.body);
        //         }
        //     }));

    }
}
