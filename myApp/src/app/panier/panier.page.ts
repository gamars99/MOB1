import { Component, OnInit } from '@angular/core';
import { DataProvider } from '../providers/data';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
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
private counter = [] ;

  constructor(private dataprovider: DataProvider, private storage: Storage,private router: Router, private toaster: ToastController) {
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
        //this.listVegetable = this.getAvailableProduct(getBasket)
        
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
        //this.listVegetable = this.getAvailableProduct(val)
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

  change(){
    //for basket
    this.storage.get('basket').then(getBasket => {
      
      //le local storage 'basket' existe
      if(getBasket){
        this.total = 0 
        let i = 0
        getBasket.forEach(element => {
          this.total += element.price * this.counter[i];
          i++
        });
      }
    })
  }

  deleteVegetable(id){
    this.storage.get('basket').then(getBasket => {
      //le local storage 'basket' existe
      if(getBasket){
        let i = 0
        getBasket.forEach(element => {
          if(element.id == id){
            let index = getBasket.indexOf(element)
            if (index > -1){
              getBasket.splice(index,1)
            }
          }
          i++
        },
        this.basket = getBasket,
        this.storage.set('basket', this.basket).then(() => {
          this.change()
        }),
        );
      }

    })
  }

  validOffer(){
      if(this.basket.length){
        this.router.navigateByUrl("cagettes")
        //toast
        this.toaster.create({
          message: "Votre commande a été effectué",
          duration: 2000,
        }).then(toast => {
          toast.present();
        });
      }else{
        //toast
        this.toaster.create({
          message: "Votre panier est vide",
          duration: 2000,
        }).then(toast => {
          toast.present();
        });
      }
  }

}
