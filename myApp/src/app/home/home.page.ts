import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { DataProvider } from '../providers/data';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

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
  private Datas: DataProvider;

  constructor(private router: Router, private toaster: ToastController, private storage: Storage, dataprovider: DataProvider, private httpClient: HttpClient) {
   this.Datas = dataprovider
  }

  ngOnInit() {
    this.Datas.loadUserFromAPI().then((val) => {
      this.Datas.user = val
      if(val != null)this.router.navigateByUrl("profil");
    })


    this.storage.get('token').then(getToken => {
     this.token = getToken;
    });
  }

  addUser(){
    if(this.firstname == null || this.lastname == null || this.phone == null || this.phone == "" || this.firstname == "" || this.lastname == ""){
      //toast
      this.toaster.create({
        message: "Champs vide, veillez recontroller votre saisie.",
        duration: 2000,
      }).then(toast => {
        toast.present();
      });
    }else{
      //create user
      let httpHeaders = new HttpHeaders({

      });
      let options = {
        headers: httpHeaders
      };

      let postData = {
        "lastname": this.lastname,
        "firstname": this.firstname,
        "phonenumber": this.phone
      }

      this.httpClient.post("http://127.0.0.1:8000/api/user/apply", postData, options)
      .subscribe(data => {
        console.log(data['_body']);
        //toast
        this.toaster.create({
          message: "Bienvenue "+this.firstname+" "+this.lastname+", votre compte a bien été créé",
          duration: 2000,
        }).then(toast => {
          toast.present();
        });
        this.router.navigateByUrl("cagettes");
       }, error => {
        //toast
        this.toaster.create({
          message: "Une erreur est survenu veuillez réessayer",
          duration: 2000,
        }).then(toast => {
          toast.present();
        });
      });

      
    }
  }

  addToken(){
    if(this.token == null || this.token == "" || this.token.length != 60){
      //toast
      this.toaster.create({
        message: "Votre token est vide ou invalide !",
        duration: 2000,
      }).then(toast => {
        toast.present();
      });
    }else{
      this.storage.set('token', this.token).then(()=> {
        this.toaster.create({
          message: "Le token a été ajouté",
          duration: 2000,
        }).then(toast => {
          toast.present();
        }).then(()=>{
          this.Datas.loadUserFromAPI().then((val) => {
            this.Datas.user = val
            if(val != null)this.router.navigateByUrl("profil");
          })
        })
        
      });
    }
  }

}
