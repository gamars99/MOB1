import { Component, OnInit } from '@angular/core';
import { DataProvider } from '../providers/data';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-cagettes',
  templateUrl: './cagettes.page.html',
  styleUrls: ['./cagettes.page.scss'],
})
export class CagettesPage {

  Datafiltre: any;
  private Datas: DataProvider;

  constructor(private router : Router, dataprovider: DataProvider, private toaster: ToastController) {     
    this.Datas = dataprovider  
    this.Datafiltre = this.Datas.stock
   }

  ngOnInit() {
    this.Datafiltre = this.Datas.loadFromAPI().stock;
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

  store(name){
    this.toaster.create({
      message: "Les "+name+" ont été ajouté",
      duration: 2000,
    }).then(toast => {
      toast.present();
    })
  }

  
}
