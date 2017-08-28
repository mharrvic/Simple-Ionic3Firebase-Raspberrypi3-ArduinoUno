import { Component } from '@angular/core';
import { NavController, ToastController, ToastOptions } from 'ionic-angular';
import { ProfileProvider } from '../../providers/profile/profile';
import { AuthProvider } from '../../providers/auth/auth';
import * as firebase from "firebase";

var otherAppConfig = {
    apiKey: "AIzaSyBR1JHC3Y42cBUF5hwWuKGQAXXXc6HRxaE",
    authDomain: "users-doorlock.firebaseapp.com",
    databaseURL: "https://users-doorlock.firebaseio.com",
    projectId: "users-doorlock",
    storageBucket: "users-doorlock.appspot.com",
    messagingSenderId: "314285629746"
  };
  
  // Initialize another app with a different config
  var otherApp = firebase.initializeApp(otherAppConfig, "other");
  console.log(otherApp.name);      // "other"
  
      var db = otherApp.database();
      var ref = db.ref("button");



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public userProfile: any;


  toastOptions: ToastOptions

  constructor(public toastCtrl: ToastController, public navCtrl: NavController,
    public profileProvider: ProfileProvider, public authProvider: AuthProvider) {} 

  ionViewDidEnter() {
    this.profileProvider.getUserProfile().on('value', userProfileSnapshot => {
      this.userProfile = userProfileSnapshot.val();
    });
  }


  UpdateUnlockDoor(unlockDoor) {
    this.profileProvider.UpdateUnlockDoor('unlock');
  }
  UpdateLockDoor(lockDoor){
    this.profileProvider.UpdatelockDoor('lock');
  }
  

  unlock(){
    ref.set("unlock");
  }
  lock(){
    ref.set("lock");
  }

  

  UnlockToast() {
    let toast = this.toastCtrl.create({
      message: 'The Door is now UNLOCK!',
      duration: 3000
    });
    toast.present();
  }
  LockToast() {
    let toast = this.toastCtrl.create({
      message: 'The Door is now LOCK!',
      duration: 3000
    });
    toast.present();
  }

  goToProfile(){ this.navCtrl.push('profile'); }
}



