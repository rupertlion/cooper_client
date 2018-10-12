import { Component } from '@angular/core';
import { AlertController, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-happymessage',
  templateUrl: 'happymessage.html',
})

export class HappymessagePage {

  happymessagePage = HappymessagePage;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public navParams: NavParams) {}
  
  showAlert() {
    const alert = this.alertCtrl.create({
      title: 'You can\'t have one!',
      subTitle: 'You, my friend, have had too many beers already...!',
      buttons: ['I guess I should take better care']
    });
    alert.present();
  }

  showAlert2() {
    const alert = this.alertCtrl.create({
      title: 'Don\'t be sad!',
      subTitle: 'Surely your mother likes you?',
      buttons: ['Yes I suppose she does...']
    });
    alert.present();
  }

  showAlert3() {
    const alert = this.alertCtrl.create({
      title: 'I wasn\'t bothered anyway',
      subTitle: 'But for you, I will try to make you happy',
      buttons: ['Yes I want to be happy!']
    });
    alert.present();
  }

  showAlert4() {
    const alert = this.alertCtrl.create({
      title: 'Let\'s got rob a bank together...',
      subTitle: 'We could run off into the sunset with millions',
      buttons: ['Yes please, that would be most pleasant']
    });
    alert.present();
  }
}
