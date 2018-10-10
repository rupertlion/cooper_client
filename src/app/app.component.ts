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
  currentUser: any;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    this.pages = [
      { title: 'Home', component: HomePage }
    ];

  }

  logininPopUp() {
    console.log('popup');
    let confirm = this.alertCtrl.create({
      title: 'Login',
      inputs: [
        {
          name:'email',
          placeholder: 'email'
        },
        {
          name: 'password',
          placeholder: 'password',
          type: 'password'
        }
      ],
    buttons: [
      {
        text: 'Cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Login',
        handler: data => {
          this.login(data);
        }
      }
    ]
    });
    confirm.present();
  }

  login(credentials) {
    this._tokenService
      .signIn(credentials)
       .subscribe(
         res => (this.currentUser = res.json().data),
         err => console.error('error')
       );
  }

  logout() {
    this._tokenService
      .signOut()
        .subscribe(res => console.log(res), err => console.log('error'));
    this.currentUser = undefined;
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
