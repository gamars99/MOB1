import { Component, OnInit } from '@angular/core';
import { DataProvider } from '../providers/data';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {

  constructor(private dataprovider: DataProvider) {
    dataprovider.loadUserFromAPI();
  }

  ngOnInit() {

  }

}
