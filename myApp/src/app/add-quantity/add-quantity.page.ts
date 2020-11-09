import { Component, OnInit } from '@angular/core';
import { DataProvider } from '../providers/data';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-add-quantity',
  templateUrl: './add-quantity.page.html',
  styleUrls: ['./add-quantity.page.scss'],
})
export class AddQuantityPage implements OnInit {
  public allVegetable = [];
  public showVegetable = [];

  constructor(private router : Router, private dataprovider: DataProvider, private toaster: ToastController) { 
    dataprovider.loadFromAPI().then(getVegetable => {
      this.allVegetable = getVegetable;
    });
  }

  ngOnInit() {
    
  }

}
