import { Component, OnInit } from '@angular/core';
import { DataProvider } from '../providers/data';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import * as _ from 'lodash'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

  constructor(private router: Router,private dataprovider: DataProvider, private toaster: ToastController,private storage: Storage, private httpClient: HttpClient) { 
    dataprovider.loadFromAPI().then(getVegetable => {
      this.allVegetable = getVegetable;
    });

    dataprovider.loadUserFromAPI().then(val => {
      if(val['user_type'] != 1){
        //toast
        this.toaster.create({
          message: "Vous n'avez pas les droits !!!!",
          duration: 2000,
        }).then(toast => {
          toast.present();
        });
        this.router.navigateByUrl("cagettes");
      }
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
    let httpHeaders = new HttpHeaders({

    });

    let options = {
      headers: httpHeaders
    };
    let postData = {
      "quantities[0][id]": 1,
      "quantities[0][quantity]": 50
    }

    this.httpClient.post('http://127.0.0.1:8000/api/products/stock/', postData, options)
    .subscribe(data => {
      console.log(data['_body'])
      this.toaster.create({
        message: "Modification OK ;)",
        duration: 2000,
      }).then(toas => {
        toas.present();
      });
      this.restart();
    }, error => {
      console.log(error);
      this.toaster.create({
        message: "Erreur lors de la modificaiton",
        duration: 2000,
      }).then(toas => {
        toas.present();
      });
    })
  }

  getAvailableVegetable(val){
    return _.difference(this.allVegetable, val)
  }

}
