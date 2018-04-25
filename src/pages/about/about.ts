import { Component } from '@angular/core';
import { NavController,Platform } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController, public platform: Platform,public localNotifications: LocalNotifications) {
    this.sendPushNotification("Push is working fine.");
  }


  sendPushNotification(pushMsg) {
    this.localNotifications.schedule({
       text: pushMsg,
       led: 'FF0000',
       sound: this.setSound(),
    });
  }

  setSound() {
    if (this.platform.is('android')) {
      return 'file://assets/sounds/long-expected.mp3'
    } else {
      return 'file://assets/sounds/long-expected.mp3'
    }
  }

}
