import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {CountryListComponent} from "./pages/country-list/country-list.component";
import {AuthGuard} from "./guards/auth.guard";
import {LoginGuard} from "./guards/login.guard";
import {CountryDetailComponent} from "./pages/country-detail/country-detail.component";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login'},
  { path: "login", component: LoginComponent, canActivate: [LoginGuard]},
  { path: "countries", component: CountryListComponent, canActivate: [AuthGuard]},
  { path: "country/:country", component: CountryDetailComponent},
  { path: "**", redirectTo: '/login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
