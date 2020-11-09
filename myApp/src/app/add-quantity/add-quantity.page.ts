import { Component, OnInit } from '@angular/core';
import { DataProvider } from '../providers/data';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import * as _ from 'lodash'
import { $ } from 'protractor';
import { count } from 'console';

@Component({
  selector: 'app-add-quantity',
  templateUrl: './add-quantity.page.html',
  styleUrls: ['./add-quantity.page.scss'],
})
export class AddQuantityPage implements OnInit {
  public allVegetable = [];
  public showVegetable = [];
  private receipt = [] ;
  public counter = [] ;

  constructor(private router : Router, private dataprovider: DataProvider, private toaster: ToastController,private storage: Storage) { 
    dataprovider.loadFromAPI().then(getVegetable => {
      this.allVegetable = getVegetable;
    });
  }

  ngOnInit() {
    this.storage.get('receipt').then(getReceipt => {
      if(!getReceipt){
        this.storage.set
      }
    })
  }

  validVegetable(id, newNomber){
    console.log(newNomber)
    if(newNomber == null){
      //toast
      this.toaster.create({
        message: "Le champs quantité doit être remplie",
        duration: 2000,
      }).then(toast => {
        toast.present();
      });
    }else{
      this.dataprovider.find(id).then(val => {
        val['stock'] = newNomber;
        // console.log(val['stock'])
        this.receipt.push(val);

        this.storage.set('receipt', this.receipt).then((val) => {
          this.receipt = val;
          this.allVegetable = this.getAvailableVegetable(this.receipt);
        })
      })
    }
    
  }

  restart(){
    this.storage.set('receipt', []).then((val) => {
      this.receipt = val;
      this.dataprovider.loadFromAPI().then(getVegetable => {
        this.allVegetable = getVegetable;
      });
    })
  }

  save(){
    
  }

  getAvailableVegetable(val){
    return _.difference(this.allVegetable, val)
  }

}
