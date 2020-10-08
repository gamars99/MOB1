import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {reject, resolve} from 'q';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Injectable()
export class DataProvider {
  
  private apiurl = "http://127.0.0.1:8000/api";

  public stock = []
  public user = []
  public filteredStock = [];

  constructor(private http: HttpClient, private storage: Storage, private router: Router, private toaster: ToastController){}

  public loadFromAPI(): Promise<any>
  {
    return new Promise<any> ( (resolve, reject) => {
      this.http.get(this.apiurl+'/products').subscribe(
        response => {
          this.stock = response['data'];
          this.filteredStock = this.stock;
        },
        err => {
          console.log('API failed with code '+err.status)
        }
      )
    })
  }

  public applyFilter(value) {
    if(value != 0){
    this.filteredStock = this.stock.filter(element => element.current == value);
    }else{
      this.filteredStock = this.stock;
    }
    
  }

  public loadUserFromAPI(): Promise<any>{
    return new Promise<any> ( (resolve, reject) => {
      this.http.get(this.apiurl+'/me').subscribe(
        response => {
          this.user = response['data'];
        },
        
        err => {
          console.log('API failed with code '+err.status)
          this.storage.clear();
        }
      )
    })
  }
}