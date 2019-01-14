import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Login',
      url: '/login',
      icon: 'home'
    },
    {
      title: 'Personajes',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  // platform.ready().then(() => {
  //   //Here we will check if the user is already logged in
  //   //because we don't want to ask users to log in each time they open the app
  //   this.nativeStorage.getItem('google_user')
  //   .then( data =>{
  //     // user is previously logged and we have his data
  //     // we will let him access the app
  //     this.router.navigate(["/user"]);
  //     this.splashScreen.hide();
  //   }, error =>{
  //     this.router.navigate(["/login"]);
  //     this.splashScreen.hide();
  //   });
  //   this.statusBar.styleDefault();
  // });
}
