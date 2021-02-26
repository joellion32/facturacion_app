import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountPipe } from './count.pipe';
import { SearchPipe } from './search.pipe';



@NgModule({
  declarations: [CountPipe, SearchPipe],
  imports: [
    CommonModule
  ], exports: [
    CountPipe,
    SearchPipe
  ]
})
export class PipesModule { }
