import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';

// Instructions ---->
// Replace configPlaceholder with environment.firebase
// import { environment } from '../environments/environment';
// import configPlaceholder from './env';
import { ChatComponent } from './chat/chat.component';
import { HomeComponent } from './home/home.component';

const config = {
  apiKey: "AIzaSyAHWuPZHntruNIQPh4iXy9lCU1LlNZAcu0",
  authDomain: "chatapp-8fa60.firebaseapp.com",
  databaseURL: "https://chatapp-8fa60.firebaseio.com",
  projectId: "chatapp-8fa60",
  storageBucket: "chatapp-8fa60.appspot.com",
  messagingSenderId: "119705692298",
  appId: "1:119705692298:web:bf1cf7b01d5230ac56e573",
  measurementId: "G-8BWRKT4G0C"
};

@NgModule({
  declarations: [AppComponent, ChatComponent, HomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}