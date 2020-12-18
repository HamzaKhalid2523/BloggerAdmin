import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { RedirectLoginGuard } from './services/guards/redirectlogin.guard';
import { IsLoginGuard } from './services/guards/islogin.guard';

const routes: Routes = [
  {
    path: "",
    canActivate: [RedirectLoginGuard],
    component: AuthLayoutComponent
  },
  {
    path: "home",
    canActivate: [IsLoginGuard],
    loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
  },
  {
    path: "login",
    canActivate: [RedirectLoginGuard],
    component: LoginComponent
  },
  {
    path: "signup",
    canActivate: [RedirectLoginGuard],
    component: SignupComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
