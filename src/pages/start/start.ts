import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-start',
  templateUrl: 'start.html',
})
export class StartPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private store: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StartPage');
    this.store.get('timeTable').then(data =>{
    	console.log(data);
    	if (data == null) {
    		console.log("This Empty Me G");
    	}
    }).catch(error =>{
    	console.log(error);
    });
  }
}
