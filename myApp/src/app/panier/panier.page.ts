import { Component, OnInit } from '@angular/core';
import { DataProvider } from '../providers/data';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.page.html',
  styleUrls: ['./panier.page.scss'],
})
export class PanierPage implements OnInit {

public basket = [];

  constructor(private dataprovider: DataProvider, private storage: Storage) {
    dataprovider.loadFromAPI();
   }

  ngOnInit() {
    this.storage.get('basket').then(getToken => {
      this.basket = getToken
      console.log(this.basket);
    })
  }

  addVegetableBasket($event){
    this.dataprovider.find($event.target.value).then((val) => {
      this.basket.push(val);
      this.storage.set('basket', this.basket).then();
      this.basket = this.basket;
    });
  }

}
