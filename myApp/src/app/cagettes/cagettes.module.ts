import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CagettesPageRoutingModule } from './cagettes-routing.module';

import { CagettesPage } from './cagettes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CagettesPageRoutingModule
  ],
  declarations: [CagettesPage]
})
export class CagettesPageModule {}
