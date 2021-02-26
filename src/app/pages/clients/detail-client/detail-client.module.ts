import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailClientPageRoutingModule } from './detail-client-routing.module';

import { DetailClientPage } from './detail-client.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailClientPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [DetailClientPage]
})
export class DetailClientPageModule {}
