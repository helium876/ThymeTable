import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { StartPage } from '../pages/start/start';
import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private store: Storage) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      this.store.get('timeTable').then(data =>{
        console.log(data);
        if (data == null) {
          console.log("This Empty Me G");
          this.rootPage = StartPage;
        }else{
          this.rootPage = TabsPage;
        }
      }).catch(error =>{
        console.log(error);
      });

    });
  }
}
