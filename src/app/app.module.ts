import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Módulos propios
import { PagesModule } from './pages/pages.module';

// Rutas
import { AppRoutingModule } from './app.routes';

// Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';

// Services

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    PagesModule,
    AppRoutingModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
