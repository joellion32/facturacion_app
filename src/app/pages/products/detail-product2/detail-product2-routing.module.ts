import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailProduct2Page } from './detail-product2.page';

const routes: Routes = [
  {
    path: '',
    component: DetailProduct2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailProduct2PageRoutingModule {}
