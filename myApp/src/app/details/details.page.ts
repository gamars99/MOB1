import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataProvider } from '../providers/data';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  private value;

  constructor(private route: Router) {
   }

  ngOnInit() {
    this.value = this.route.getCurrentNavigation().extras
  }

}
