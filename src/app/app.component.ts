import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { Angular2TokenService } from '../../node_modules/angular2-token';

@Component(
  public platform: Platform,
  public statusBar: StatusBar,
  public splashScreen: SplashScreen,
  private _tokenService: Angular2TokenService
 ){
    this._tokenService.init({
      apiBase: 'https://your-cooper-api.herokuapp.com/api/v1'
    });

    this.initializeApp();
  }
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    this.pages = [
      { title: 'Home', component: HomePage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}
