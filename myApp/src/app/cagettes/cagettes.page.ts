import { Component, OnInit } from '@angular/core';
import { DataProvider } from '../providers/data';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-cagettes',
  templateUrl: './cagettes.page.html',
  styleUrls: ['./cagettes.page.scss'],
})
export class CagettesPage implements OnInit{

  constructor(private router : Router, private dataprovider: DataProvider, private toaster: ToastController) {     
    dataprovider.loadFromAPI();
   }

  ngOnInit() {
    
  }

  setFilter(v){
    this.dataprovider.applyFilter(v);
  }

  showDetails(v){
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
