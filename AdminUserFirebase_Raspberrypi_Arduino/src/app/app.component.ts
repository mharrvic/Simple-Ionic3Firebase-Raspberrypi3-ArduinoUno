import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import * as firebase from "firebase";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    
    firebase.initializeApp({
      apiKey: "AIzaSyDa5xysepngVfS8y_ORgu7jjLHBFPVy7q4",
    authDomain: "project-magnetic-doorlock.firebaseapp.com",
    databaseURL: "https://project-magnetic-doorlock.firebaseio.com",
    projectId: "project-magnetic-doorlock",
    storageBucket: "project-magnetic-doorlock.appspot.com",
    messagingSenderId: "204237060173"
      
  });

    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.rootPage = 'login';
        unsubscribe();
      } else { 
        this.rootPage = HomePage;
        unsubscribe();
      }
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}