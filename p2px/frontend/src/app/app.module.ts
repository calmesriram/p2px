import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { SignupComponent } from './signup/signup.component';
import { ReactiveFormsModule, FormsModule,FormBuilder } from '@angular/forms';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationService } from './services/authentication.service';
import { CreateOrderService } from './services/create-order.service';
import { ScriptLoaderService } from './services/script-loader.service';
import { AuthGuradGuard } from './services/auth-gurad.guard';


@NgModule({
  declarations: [
    AppComponent,
    // LoginComponent,
    MenuComponent,
    SignupComponent,    
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
    // HttpClient 
  ],
  providers: [
    AuthenticationService,
    AuthGuradGuard,
    CreateOrderService,
   
    ScriptLoaderService,
    FormBuilder,
    ReactiveFormsModule,
    { provide: Window, useValue: window }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
