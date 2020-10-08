import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  private value;

  constructor(private route: Router, private toaster: ToastController) {
   }

  ngOnInit() {
    this.value = this.route.getCurrentNavigation().extras
  }

  /*store(name){
    this.toaster.create({
      message: "Les "+name+" ont été ajouté",
      duration: 2000,
    }).then(toast => {
      toast.present();
    })
  }*/

}
