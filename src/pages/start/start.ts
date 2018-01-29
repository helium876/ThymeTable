import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-start',
  templateUrl: 'start.html',
})
export class StartPage {
  loader:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private store: Storage, private loadingCtrl: LoadingController) {
  
    this.loader = this.loadingCtrl.create({
      content: "Please Wait...Tapping UTech's Severs"
    });

  }

  getUTech(){
    this.loader.present();
    setTimeout(() => {
    this.loader.dismiss();
    }, 3000);
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