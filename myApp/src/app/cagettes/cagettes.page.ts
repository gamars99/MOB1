import { Component, OnInit } from '@angular/core';
import { DataProvider } from '../providers/data';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cagettes',
  templateUrl: './cagettes.page.html',
  styleUrls: ['./cagettes.page.scss'],
})
export class CagettesPage {

  Datafiltre: any;
  private Datas: DataProvider;

  constructor(private router : Router, dataprovider: DataProvider) { 
    this.Datas = dataprovider
    this.Datafiltre = this.Datas.stock
   }

  ngOnInit() {
  }

  filtre(value) {
    var filtre = this.Datas.stock.filter(element => element.current == value);
    this.Datafiltre = filtre;
  }

  all(){
    this.Datafiltre = this.Datas.stock;
  }

  showDetails(v){
    //console.log(v);
    this.router.navigateByUrl("details/",v);
  }

  
}
