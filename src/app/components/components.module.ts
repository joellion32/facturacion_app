import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { PipesModule } from '../pipes/pipes.module';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsComponent } from './products/products.component';
import { DisplayComponent } from './display/display.component';
import { BillingComponent } from './billing/billing.component';
import { SkeletonComponent } from './skeleton/skeleton.component';
import { UsersComponent } from './users/users.component';
import { ReportsComponent } from './reports/reports.component';



@NgModule({
  declarations: [SearchComponent, ProductsComponent, DisplayComponent, BillingComponent, SkeletonComponent, UsersComponent, ReportsComponent],
  imports: [
    CommonModule,
    PipesModule,
    FormsModule,
    ReactiveFormsModule,
  ], 
  exports: [
    SearchComponent, 
    ProductsComponent, 
    DisplayComponent,
    SkeletonComponent
  ]
})
export class ComponentsModule { }
