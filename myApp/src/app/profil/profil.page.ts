import { Component, OnInit } from '@angular/core';
import { DataProvider } from '../providers/data';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {
  Datafiltre: any
  private Datas: DataProvider

  constructor(dataprovider: DataProvider) {
    this.Datas = dataprovider
    this.Datafiltre = this.Datas.user
    console.log(this.Datafiltre);
  }

  ngOnInit() {
    console.log(this.Datafiltre);
  }

}
