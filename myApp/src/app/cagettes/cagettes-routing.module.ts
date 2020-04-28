import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CagettesPage } from './cagettes.page';

const routes: Routes = [
  {
    path: '',
    component: CagettesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CagettesPageRoutingModule {}
