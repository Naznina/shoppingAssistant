import { Component } from '@angular/core';

//import { ContactPage } from '../contact/contact';
//import { HomePage } from '../home/home';
import { ItemPage } from '../item/item';
import { MartPage } from '../mart/mart';
import { AboutPage } from '../about/about';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ItemPage;
  tab2Root = MartPage;
  tab3Root = AboutPage;

  constructor() {

  }
}
