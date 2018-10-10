import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { Angular2TokenService } from '../../node_modules/angular2-token';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;
  currentUser: any;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public alertCtrl: AlertController,
    private _tokenService: Angular2TokenService
  ) {
    this._tokenService.init({
      apiBase: 'https://rl-cooper-api.herokuapp.com/api/v1'
    });

    // this.initializeApp();

    }

    loginPopUp() {
      console.log('popup');
      let confirm = this.alertCtrl.create({
        title: 'Login',
        inputs: [
          {
            name: 'email',
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
        .subscribe(res => console.log(res), err => console.error('error'));
      this.currentUser = undefined;
    }
  }