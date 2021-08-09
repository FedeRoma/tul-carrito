import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './carrito/checkout/checkout.component';
import { LoginFormComponent } from './login/login-form/login-form.component';
import { RegisterComponent } from './login/register/register.component';
import { MainPageComponent } from './products/main-page/main-page.component';
import { ProductsListComponent } from './products/products-list/products-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginFormComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'home', component: MainPageComponent, children: [
      { path: '', component: ProductsListComponent },
      { path: 'products', component: ProductsListComponent },
      { path: 'checkout', component: CheckoutComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
