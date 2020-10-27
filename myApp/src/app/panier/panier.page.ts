import { Component, OnInit } from '@angular/core';
import { DataProvider } from '../providers/data';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.page.html',
  styleUrls: ['./panier.page.scss'],
})
export class PanierPage implements OnInit {

public dataById = [];

  constructor(private dataprovider: DataProvider, private storage: Storage) {
    dataprovider.loadFromAPI();
   }

  ngOnInit() {
    this.storage.get('basket', )
  }

  addVegetableBasket($event){
    this.dataprovider.find($event.target.value).then((val) => {
      this.dataById.push(val);
      this.storage.set('basket', this.dataById).then();
      console.log(this.dataById)
    });
  }

}
