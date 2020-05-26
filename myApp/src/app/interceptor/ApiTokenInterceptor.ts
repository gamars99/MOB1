import {Inject, Injectable} from '@angular/core';
import { Storage } from '@ionic/storage';
import{
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
} from '@angular/common/http';
import {from, Observable} from 'rxjs';
import { SelectMultipleControlValueAccessor } from '@angular/forms';

@Injectable()
export class ApiTokenInterceptor implements HttpInterceptor {
    private token: String ;

    constructor(private storage: Storage){}

    async foo(){
        this.storage.get('token').then(getToken => {
            console.log("Token : "+getToken);
            this.token = getToken;
        });
    }

    intercept(req: HttpRequest<any>, next: HttpHandler,): Observable<HttpEvent<any>>
    {
        this.foo();
        console.log("this.token : "+this.token);
            req = req.clone({
                setHeaders: {
                    'Content-Type'  :   'application/json, charset=utf-8',
                    Accept          :   'application/json',
                    Authorization   :   "Bearer "+this.token,
                },
            });
        console.log(req);
        return next.handle(req);
    }
}