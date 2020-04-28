import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public welcomeMessage : string = "Hello le monde";
  public name : string;
  public isMale : boolean;

  constructor() {
    this.name = "Gaël";
    this.isMale = true;
  }

}
