import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {reject, resolve} from 'q';
import { Storage } from '@ionic/storage';

@Injectable()
export class DataProvider {
  
  private apiurl = "http://127.0.0.1:8000/api";

  public stock = []
  public user = []

  constructor(private http: HttpClient, private storage: Storage){}

  public loadFromAPI(): Promise<any>
  {
    return new Promise<any> ( (resolve, reject) => {
      this.http.get(this.apiurl+'/products').subscribe(
        response => {
          this.stock = response['data'];
        },
        err => {
          console.log('API failed with code '+err.status)
        }
      )
    })
  }

  public loadUserFromAPI(): Promise<any>{
    return new Promise<any> ( (resolve, reject) => {
      this.http.get(this.apiurl+'/me').subscribe(
        response => {
          this.user = response['data'];
          
          this.storage.set('firstname', this.user['firstname']);
          this.storage.set('lastname', this.user['lastname']);
          this.storage.set('phone', null);
          console.log(this.user['firstname']);
        },
        err => {
          this.storage.set('firstname', null);
          this.storage.set('lastname', null);
          this.storage.set('phone', null);
          console.log('API failed with code '+err.status)
        }
      )
    })
  }
}