import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PersonProvider } from '../../providers/person/person';
import { PerformanceDataProvider } from '../../providers/performance-data/performance-data';
import { ModalController } from 'ionic-angular';
import { ResultsPage } from '../results/results';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    user: any = {};
    
    constructor(
      public navCtrl: NavController,
      public person: PersonProvider,
      public modalCtrl: ModalController,
      public performanceData: PerformanceDataProvider
      ) {
      this.user = { distance: 1000, age: 20, gender: 'female' };
      }
      
      calculate(user) {
        this.person.age = user.age;
        this.person.gender = user.gender;
        this.person.doAssessment(user.distance);
      }

      showResults() {
        this.modalCtrl.create(ResultsPage).present();
      }

      saveResults(user) {
        this.performanceData
          .saveData({ performance_data: { data: { message: this.person.assessmentMessage}}})
          .subscribe(data => console.log(data));
      }
}
