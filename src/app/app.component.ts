import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { CalculatorPage } from '../pages/calculator/calculator';
import { HappymessagePage } from '../pages/happymessage/happymessage';
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
      apiBase: 'https://rjl-cooper-api.herokuapp.com/api/v1'
      // apiBase: 'https://localhost:3000/api/v1'
    });

    this.initializeApp();

    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Calcuator', component: CalculatorPage },
      { title: 'Fun times', component: HappymessagePage },
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

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
  
    signUpPopUp() {
      console.log('popup');
      let confirm = this.alertCtrl.create({
        title: 'Sign up',
        inputs: [
          {
            name: 'email',
            placeholder: 'email'
          },
          {
            name: 'password',
            placeholder: 'password',
            type: 'password'
          },
          {
            name: 'password_confirmation',
            placeholder: 'password confirmation',
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
            text: 'Sign Up',
            handler: data => {
              this.signUp(data);
            }
          }
        ]
      });
      confirm.present();
    }
  
    updatePopUp() {
      console.log('popup');
      let confirm = this.alertCtrl.create({
        title: 'Update',
        inputs: [
          {
            name: 'email',
            placeholder: 'email'
          },
          {
            name: 'password',
            placeholder: 'New password',
            type: 'password'
          },
          {
            name: 'password_confirmation',
            placeholder: 'New password confirmation',
            type: 'password'
          },
          {
            name: 'password_current',
            placeholder: 'Current Password',
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
            text: 'Update',
            handler: data => {
              this.updateCreds(data);
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
  
    signUp(credentials) {
      console.log(credentials);
      this._tokenService
        .registerAccount(credentials)
        .subscribe(
          res => (this.currentUser = res.json().data),
          err => console.error('error')
        );
    }
  
    deleteAcc() {
      this._tokenService
        .deleteAccount()
        .subscribe(res => console.log(res), err => console.error('error'));
      this.currentUser = undefined;
    }
  
    updateCreds(credentials) {
      console.log(credentials)
      this._tokenService
        .updatePassword(credentials)
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

    openPage(page) {
      this.nav.setRoot(page.component);
    }

  }