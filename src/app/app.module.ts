import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
// import { ContactPage } from '../pages/contact/contact';
// import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
import { ItemPage } from '../pages/item/item';
import { MartPage } from '../pages/mart/mart';
import { StorePage } from '../pages/store/store';
import { StoreLocationModalPage } from '../pages/store-location-modal/store-location-modal';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ItemSearchPipe } from '../pipes/item-search/item-search';

import { SQLite } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';

//Database provider
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';
import { DatabaseProvider } from '../providers/database/database';
import { SQLitePorter } from '@ionic-native/sqlite-porter';

//Google Map
//import { AgmCoreModule } from '@agm/core';

//GeoLocation
//import { Geolocation } from '@ionic-native/geolocation';


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ItemPage,
    MartPage,
    StorePage,
    StoreLocationModalPage,
    ItemSearchPipe,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp)
    //,
    //   AgmCoreModule.forRoot({
    //     apiKey: "AIzaSyCgCP78arh0qyxLGqBV4G7-aBrCUp72bsc",
    //     libraries: ["places"]
    // })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ItemPage,
    MartPage,
    StorePage,
    StoreLocationModalPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    SQLite,
    Toast,
    DatabaseProvider,
    SQLitePorter
    //,
    //Geolocation
  ]
})
export class AppModule { }
