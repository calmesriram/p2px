import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { MenuComponent } from './menu/menu.component';
// import { AuthGuradGuard } from './services/auth-gurad.guard';

const routes: Routes = [
  {
    path:'signup',
    component:SignupComponent,
    // canActivate:[AuthGuradGuard]        
  },
  {
    path:'menu',
    component:MenuComponent,
    // canActivate:[AuthGuradGuard]
  },
  {
    path:'',
    redirectTo:'signup',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
