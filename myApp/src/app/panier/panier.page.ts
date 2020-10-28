import { Component, OnInit } from '@angular/core';
import { DataProvider } from '../providers/data';
import { Storage } from '@ionic/storage';
import { timeStamp } from 'console';
import { compileInjectable } from '@angular/compiler';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.page.html',
  styleUrls: ['./panier.page.scss'],
})
export class PanierPage implements OnInit {

public listVegetable;
public basket = [];
public total = 0;
public finalarry = []

  constructor(private dataprovider: DataProvider, private storage: Storage) {
    
   }

  ngOnInit() {
    this.dataprovider.loadFromAPI().then(getVegetable => {
      this.listVegetable = getVegetable;
      this.storage.get('basket').then((val) => {
        let test = this.compare(this.listVegetable, val)
        console.log(test)
      })
    });

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
  }

  addVegetableBasket($event){
    this.dataprovider.find($event.target.value).then((val) => {
      this.basket.push(val);
      this.total += val.price;

      this.storage.set('basket', this.basket).then((val) =>{
        this.basket = val;
      });

      let index = this.listVegetable.indexOf(val)
      if(index > -1){
        this.listVegetable.splice(index,1)
      }
    });
  }

  emptyBasket(){
    this.storage.set('basket', []).then((val => {
      this.basket = val;
      this.total = 0
    }));
  }

  compare(arr1,arr2) {
    arr1.forEach((e1)=>arr2.forEach((e2)=> {
      console.log(e1)
      console.log(e2)
      if(e1 !== e2){
        this.finalarry.push(e1)
        console.log(this.finalarry)
      }
    }));
    return this.finalarry;
  }

}
