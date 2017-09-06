import { Component } from '@angular/core';
import { NavController, ToastController, ToastOptions } from 'ionic-angular';
import { ProfileProvider } from '../../providers/profile/profile';
import { AuthProvider } from '../../providers/auth/auth';
import * as firebase from "firebase";

var otherAppConfig = {
  apiKey: "AIzaSyDa5xysepngVfS8y_ORgu7jjLHBFPVy7q4",
  authDomain: "project-magnetic-doorlock.firebaseapp.com",
  databaseURL: "https://project-magnetic-doorlock.firebaseio.com",
  projectId: "project-magnetic-doorlock",
  storageBucket: "project-magnetic-doorlock.appspot.com",
  messagingSenderId: "204237060173"
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



