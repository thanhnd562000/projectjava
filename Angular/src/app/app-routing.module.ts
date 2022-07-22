import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './features/product-list/product-list.component';
import { SearchComponent } from './features/search/search.component';

const routes: Routes = [

  { path: '', redirectTo: 'products', pathMatch: 'full' },
  {path:'search/:keyword',component:SearchComponent},
  { path: 'products', component: ProductListComponent },
  { path: 'category/:id', component: ProductListComponent },
  { path: 'category', component: ProductListComponent },
  { path: '***', redirectTo:'products',pathMatch:'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
