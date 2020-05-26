import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  
  private firstname: String ;
  private lastname: String ;
  private phone: String ;
  private token: String ;

  constructor(private toaster: ToastController, private storage: Storage) {
  }

  ngOnInit() {
    this.storage.get('firstname').then(getFirstname => {
     this.firstname = getFirstname;
    });
    this.storage.get('lastname').then(getlastname => {
     this.lastname = getlastname;
    }); 
    this.storage.get('phone').then(getPhone => {
     this.phone = getPhone;
    }); 
    this.storage.get('token').then(getToken => {
     this.token = getToken;
    }); 
  }

  addUser(){
    if(this.firstname == null || this.lastname == null || this.phone == null ){
      //toast
      this.toaster.create({
        message: "Champs vide, veillez recontroller votre saisie.",
        duration: 2000,
      }).then(toast => {
        toast.present();
      });
    }else{
      //create user
      this.storage.set('firstname', this.firstname);
      this.storage.set('lastname', this.lastname);
      this.storage.set('phone', this.phone);
      console.log(this.firstname+","+this.lastname+","+this.phone);

      //toast
      this.toaster.create({
        message: "Bienvenue "+this.firstname+" "+this.lastname+", votre compte a bien été créé",
        duration: 2000,
      }).then(toast => {
        toast.present();
      });
    }
  }

  addToken(){
    if(this.token == null){
      //toast
      this.toaster.create({
        message: "Votre token est vide !",
        duration: 2000,
      }).then(toast => {
        toast.present();
      });
    }else{
      this.storage.set('token', this.token);
    }
  }

}
