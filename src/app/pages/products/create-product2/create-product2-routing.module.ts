import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateProduct2Page } from './create-product2.page';

const routes: Routes = [
  {
    path: '',
    component: CreateProduct2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateProduct2PageRoutingModule {}
