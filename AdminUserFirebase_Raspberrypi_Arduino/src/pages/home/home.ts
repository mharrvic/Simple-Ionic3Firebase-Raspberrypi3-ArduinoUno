import { Component } from '@angular/core';
import { ToastController, ToastOptions, NavController } from 'ionic-angular';
import * as firebase from "firebase";

var otherAppConfig = {
  
  
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

  toastOptions: ToastOptions

  constructor(public toastCtrl: ToastController, public navCtrl: NavController) {}

  goToCreate(){ this.navCtrl.push('event-create'); }

  goToList(){ this.navCtrl.push('event-list'); }

  unlock() {
    ref.set("down");
    
  }
  lock(){
    ref.set("up");
  }

  unlockToast() {
    let toast = this.toastCtrl.create({
      message: 'The Door is now UNLOCK!',
      duration: 3000
    });
    toast.present();
  }
  lockToast() {
    let toast = this.toastCtrl.create({
      message: 'The Door is now LOCK!',
      duration: 3000
    });
    toast.present();
  }

  goToProfile(){ this.navCtrl.push('profile'); }
}



