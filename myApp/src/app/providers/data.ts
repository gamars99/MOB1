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
          return resolve(this.stock);
        },
        err => {
          //toast
          this.toaster.create({
            message: "Erreur de chargement des produits, veuillez réessayer",
            duration: 2000,
          }).then(toast => {
            toast.present();
          });
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
          //toast
          this.toaster.create({
            message: "Vous êtes connecté, bienvenue !!!",
            duration: 2000,
          }).then(toast => {
            toast.present();
          });
          return resolve(response['data']);
        },
        
        err => {
          //toast
          this.toaster.create({
            message: "Votre token est vide ou invalide !",
            duration: 2000,
          }).then(toast => {
            toast.present();
          });
          this.storage.clear();
        }
      )
    })
  }

  public find(id){
    return new Promise<any>((resolve, reject) => {

      this.stock.forEach((ved) =>{

        if (ved.id == id) resolve(ved)
      })
      reject('Vedj # ' + id + ' not found')
    })
  }
}