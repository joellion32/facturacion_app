import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewInvoicesPageRoutingModule } from './view-invoices-routing.module';

import { ViewInvoicesPage } from './view-invoices.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewInvoicesPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ViewInvoicesPage]
})
export class ViewInvoicesPageModule {}
