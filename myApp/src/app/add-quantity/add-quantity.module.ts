import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddQuantityPageRoutingModule } from './add-quantity-routing.module';

import { AddQuantityPage } from './add-quantity.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddQuantityPageRoutingModule
  ],
  declarations: [AddQuantityPage]
})
export class AddQuantityPageModule {}
