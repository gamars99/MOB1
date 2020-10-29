import { Component, OnInit } from '@angular/core';
import { DataProvider } from '../providers/data';
import { Storage } from '@ionic/storage';
import { timeStamp } from 'console';
import { compileInjectable } from '@angular/compiler';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { AngularDelegate } from '@ionic/angular';
import * as _ from 'lodash'

@Component({
  selector: 'app-panier',
  templateUrl: './panier.page.html',
  styleUrls: ['./panier.page.scss'],
})
export class PanierPage implements OnInit {

public listVegetable = [];
public basket = [];
public total = 0;
public finalarry = []

  constructor(private dataprovider: DataProvider, private storage: Storage) {
    
   }

  ngOnInit() {
    this.dataprovider.loadFromAPI().then(getVegetable => {
      this.listVegetable = getVegetable;
      

      //for total
      this.storage.get('total').then(getTotal => {
        //le local storage 'total' n'existe pas
        if(!getTotal){
          this.storage.set('total', this.total).then();
        }
      });

      //for basket
      this.storage.get('basket').then(getBasket => {
        
        //le local storage 'basket' existe
        if(getBasket){
          this.basket = getBasket
          this.basket.forEach(element => {
            this.total += element.price;
          });

        //le local storage 'basket' n'existe pas (le crée)
        }else{
          this.storage.set('basket', this.basket).then();
        }      
      });

    });
  }

  addVegetableBasket($event){
    this.dataprovider.find($event.target.value).then((val) => {
      this.basket.push(val);
      this.total += val.price;

      this.storage.set('basket', this.basket).then((val) =>{
        this.basket = val;
        this.listVegetable = this.getAvailableProduct(val)
      });
    });
  }

  getAvailableProduct(val) {
      return _.differenceBy(this.listVegetable, val)
    
  }

  emptyBasket(){
    this.storage.set('basket', []).then((val => {
      this.basket = val;
      this.total = 0
    }));
  }

}
