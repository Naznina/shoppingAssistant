import { Component, NgZone, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from "@angular/forms";
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from './../../providers/database/database';
import { Toast } from '@ionic-native/toast';
import { ViewController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

/**
 * Generated class for the StoreLocationModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-store-location-modal',
  templateUrl: 'store-location-modal.html',
})
export class StoreLocationModalPage {
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  public martId: any;

  @ViewChild("search")
  public searchElementRef;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private toast: Toast,
    private databaseprovider: DatabaseProvider,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private alertCtrl: AlertController,
    public geolocation: Geolocation,) {

      this.martId = navParams.get("martId");
      this.zoom = 4;
      this.latitude = 39.8282;
      this.longitude = -98.5795;

      //create search FormControl
      this.searchControl = new FormControl();

      //set current position
      this.setCurrentPosition();
      // this.getLocation();

  }

  ionViewDidLoad() {
    //set google maps defaults
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;

    //create search FormControl
    this.searchControl = new FormControl();

    //set current position
    this.setCurrentPosition();
    // this.getLocation();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let nativeHomeInputBox = document.getElementById('txtHome').getElementsByTagName('input')[0];
      let autocomplete = new google.maps.places.Autocomplete(nativeHomeInputBox, {
        //types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;

         this.addStore(place);
        });
      });
    });
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
        alert( this.latitude +" : "+  this.longitude);
      });
    }
  }

  // getLocation(){
  //   this.geolocation.getCurrentPosition().then((res) => {
  //     this.latitude = res.coords.latitude;
  //     this.longitude = res.coords.longitude;
  //     this.zoom = 12;
  //   }).catch((error) => {
  //   console.log('Error getting location', error);
  //   });
  // }

  private addStore(place){
    let store:{} = { storeName: place.name,
      martId: this.martId,
      storeAddress: place.formatted_address,
      latitude: place.geometry.location.lat,
      longitude: place.geometry.location.lng
    };

    this.databaseprovider.addStore(store).then(data => {
      // this.navCtrl.popToRoot();
      this.presentConfirm();
     
    });

  }

  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Confirm store location',
      message: 'Do you want to add this store?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }

  // public closeModal() {
  //   this.viewCtrl.dismiss();
  // }

}
