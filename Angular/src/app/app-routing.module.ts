import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OktaAuthGuard, OktaCallbackComponent } from '@okta/okta-angular';
import { MemberPagesComponent } from './features/member-pages/member-pages.component';
import { OrderhistoryComponent } from './features/orderhistory/orderhistory.component';
import { ProductDetailComponent } from './features/product-detail/product-detail.component';
import { ProductListComponent } from './features/product-list/product-list.component';
import { SearchComponent } from './features/search/search.component';

const routes: Routes = [

  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'search/:keyword', component: ProductListComponent },
  { path: 'products/:id', component: ProductDetailComponent },
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
  {
    path: 'login',
    loadChildren: () =>
      import(
        'src/app/features/login/login.module'
      ).then((n) => n.LoginModule),
  },
  {path:'login/callback',component:OktaCallbackComponent},
  {path:'members',component:MemberPagesComponent,canActivate:[OktaAuthGuard]},
  {path:'orderhistory',component:OrderhistoryComponent,canActivate:[OktaAuthGuard]},
  { path: '***', redirectTo: 'products', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
