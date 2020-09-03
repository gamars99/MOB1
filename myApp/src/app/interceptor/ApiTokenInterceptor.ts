import {Inject, Injectable} from '@angular/core';
import { Storage } from '@ionic/storage';
import{
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
} from '@angular/common/http';
import {from, Observable} from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class ApiTokenInterceptor implements HttpInterceptor {
    private token: String ;
    
    constructor(private storage: Storage){}

    /*intercept(req: HttpRequest<any>, next: HttpHandler,): Observable<HttpEvent<any>>
    {
        //console.log("1");
        this.storage.get('token').then(getToken => {
            this.token = getToken;
            //console.log("2"); 
        });
        req = req.clone({
            setHeaders: {
                'Content-Type'  :   'application/json, charset=utf-8',
                Accept          :   'application/json',
                //Authorization   :   "Bearer "+this.token,
                Authorization   :   "Bearer oaClAw4Cjtga8mzhZiTkJe4EbEXRky14tb6K66GgwzXEZKyGxa98PbMTIbAH",
            },            
        });
        //console.log("3");
        //console.log("4");
        return next.handle(req);
    }*/
    intercept(req: HttpRequest<any>,next: HttpHandler): Observable<HttpEvent<any>>{
      
        return from(this.storage.get('token'))
        .pipe(
          switchMap(token => {
             const headers = req.headers
                      .set('Authorization', 'Bearer ' + token)
                      .append('Content-Type', 'application/json');
             const requestClone = req.clone({
               headers 
              });
            return next.handle(requestClone);
          })
         );
    }
}