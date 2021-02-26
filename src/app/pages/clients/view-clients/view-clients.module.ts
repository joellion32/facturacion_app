import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewClientsPageRoutingModule } from './view-clients-routing.module';

import { ViewClientsPage } from './view-clients.page';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewClientsPageRoutingModule,
    PipesModule,
    ComponentsModule
  ],
  declarations: [ViewClientsPage]
})
export class ViewClientsPageModule {}
