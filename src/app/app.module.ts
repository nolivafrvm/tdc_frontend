import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { APP_ROUTES } from './app.routes';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { PagesComponent } from './pages/pages.component';

import { ServiceModule } from './services/service.module';
import { SharedModule } from './shared/shared.module';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { StompService } from './services/websocket/stomp.service';

const config: SocketIoConfig = { url: 'http://localhost:8080/socket.io', options: {} };





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,        
    PagesComponent
  ],
  imports: [
    BrowserModule,    
    APP_ROUTES,    
    FormsModule,
    ReactiveFormsModule,
    ServiceModule,
    SharedModule,    
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
