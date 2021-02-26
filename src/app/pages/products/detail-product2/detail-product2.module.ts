import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailProduct2PageRoutingModule } from './detail-product2-routing.module';

import { DetailProduct2Page } from './detail-product2.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailProduct2PageRoutingModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
  declarations: [DetailProduct2Page]
})
export class DetailProduct2PageModule {}
