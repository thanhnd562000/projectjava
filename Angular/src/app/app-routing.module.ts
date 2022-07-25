import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailComponent } from './features/product-detail/product-detail.component';
import { ProductListComponent } from './features/product-list/product-list.component';
import { SearchComponent } from './features/search/search.component';

const routes: Routes = [

  { path: '', redirectTo: 'products', pathMatch: 'full' },
  {path:'search/:keyword',component:ProductListComponent},
  {path:'products/:id',component:ProductDetailComponent},
  { path: 'products', component: ProductListComponent },
  { path: 'category/:id', component: ProductListComponent },
  { path: 'category', component: ProductListComponent },
  {
    path: 'cart-detail',
    loadChildren: () =>
      import(
        'src/app/features/cart-details/cart-details.module'
      ).then((n) => n.CartDetailsModule),
  },
  {
    path: 'check-out',
    loadChildren: () =>
      import(
        'src/app/features/check-out/check-out.module'
      ).then((n) => n.CheckOutModule),
  },
  { path: '***', redirectTo:'products',pathMatch:'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
