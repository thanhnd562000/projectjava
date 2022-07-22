import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list.component';
import { RouterModule, Routes } from '@angular/router';

// export const routes:Routes=[
//   {path:'',component:ProductListComponent}
// ]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    // RouterModule.forChild(routes),
  ]
})
export class ProductListModule { }
