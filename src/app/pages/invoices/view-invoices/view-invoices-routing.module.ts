import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewInvoicesPage } from './view-invoices.page';

const routes: Routes = [
  {
    path: '',
    component: ViewInvoicesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewInvoicesPageRoutingModule {}
