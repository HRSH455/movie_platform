import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { UserbookingmovieComponent } from './components/userbookingmovie/userbookingmovie.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserNavComponent } from './components/user-nav/user-nav.component';
import { AdminaddmovieComponent } from './components/adminaddmovie/adminaddmovie.component';
import { AdminviewbookingComponent } from './components/adminviewbooking/adminviewbooking.component';
import { UserviewmovieComponent } from './components/userviewmovie/userviewmovie.component';
import { AdminviewmovieComponent } from './components/adminviewmovie/adminviewmovie.component';
import { UserviewbookingComponent } from './components/userviewbooking/userviewbooking.component';
import { AdminNavComponent } from './components/admin-nav/admin-nav.component';
import { JwtInterceptor } from './helpers/jwt.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ErrorComponent,
    LoginComponent,
    RegistrationComponent,
    UserbookingmovieComponent,
    NavbarComponent,
    UserNavComponent,
    AdminaddmovieComponent,
    AdminviewbookingComponent,
    UserviewmovieComponent,
    AdminviewmovieComponent,
    UserviewbookingComponent,
    AdminNavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS,
       useClass: JwtInterceptor, 
       multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
