import { Component, OnInit } from '@angular/core';
import { DataProvider } from '../providers/data';

@Component({
  selector: 'app-cagettes',
  templateUrl: './cagettes.page.html',
  styleUrls: ['./cagettes.page.scss'],
})
export class CagettesPage {

  Datafiltre: any;
  Datas = new DataProvider;

  constructor() { 
    this.Datafiltre = this.Datas.stock
   }

  filtre(value) {
    var filtre = this.Datas.stock.filter(element => element.current == value);
    this.Datafiltre = filtre;
  }

  all(){
    this.Datafiltre = this.Datas.stock;
  }

  
}
