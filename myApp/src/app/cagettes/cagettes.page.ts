import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cagettes',
  templateUrl: './cagettes.page.html',
  styleUrls: ['./cagettes.page.scss'],
})
export class CagettesPage {

  jsonData: any;

  constructor() {
    this.jsonData = [
      {"id":1,"name":"Carotte" ,    "img":"https://www.lesfruitsetlegumesfrais.com/_upload/cache/ressources/produits/carotte/carotte_346_346_filled.jpg", "price": 15,    "quantity":12, "unite":"kg"},
      {"id":2,"name":"Artichaut",   "img":"https://www.gemuese.ch/Ressourcen-fr/Bilder-fr/Gemusearten-fr/Gemusebilder-Header-fr/Headerbilder_Saisonkalender_Artischoke-fr.jpg", "price": 15,    "quantity":18, "unite":"kg"},
      {"id":3,"name":"Poivron",     "img":"https://www.cuisine-de-bebe.com/wp-content/uploads/le-poivron.jpg", "price": 7,     "quantity":24, "unite":"kg"},
      {"id":4,"name":"Tomate",      "img":"https://www.lesfruitsetlegumesfrais.com/_upload/cache/ressources/produits/tomate/tomate_-_copie_346_346_filled.jpg", "price": 8,     "quantity":8, "unite":"kg"},
      {"id":5,"name":"Asperge",     "img":"https://lh3.googleusercontent.com/proxy/4mT4lVo6RzCUwYTucNCf_ceuqnsSkQegSEGz-o8kHpYLtrEzPEt7k3TEDpNPXdCQYlU7XJSPi_WjwA4rZsxQ45P_IUguwO5EksRgQgVb0JaxgiqAYuMHzo1lU36jDqP1s0P7hO3mQLOw8M-Xs3aTow", "price": 2,     "quantity":3, "unite":"kg"},
      {"id":6,"name":"Basilic",     "img":"https://img-3.journaldesfemmes.fr/rBNhhKZBYs9j72Nz2W_ClR2NkhQ=/910x607/smart/a12f0da012524ae79b979bafc1f1d251/ccmcms-jdf/10662824.jpg", "price": 1.2,   "quantity":18, "unite":"kg"},
      {"id":7,"name":"Radis",       "img":"https://img-3.journaldesfemmes.fr/HpQSq5FhrpiwCkSulffBZdTAN10=/910x607/smart/20f13ddfde67407c827768eaba7948a2/ccmcms-jdf/10660880.jpg", "price": 5.58,  "quantity":16, "unite":"kg"},
      {"id":8,"name":"Champignon",  "img":"https://www.academiedugout.fr/images/13403/1200-auto/champignon-de-paris_000.jpg?poix=50&poiy=50", "price": 6.32,  "quantity":54, "unite":"kg"},
      {"id":9,"name":"oeuf",        "img":"https://www.journaldugeek.com/content/uploads/2019/01/oeuf.png", "price": 7.95,  "quantity":12, "unite":"carton de 6"}
    ];
   }
}
