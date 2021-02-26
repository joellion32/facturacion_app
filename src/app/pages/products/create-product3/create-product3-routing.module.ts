import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateProduct3Page } from './create-product3.page';

const routes: Routes = [
  {
    path: '',
    component: CreateProduct3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateProduct3PageRoutingModule {}
