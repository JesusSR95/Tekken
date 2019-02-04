import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Router } from '@angular/router';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  langmenu: any;
  public appPages = [
    // {
    //   title: 'Login',
    //   url: '/login',
    //   icon: 'home'
    // },
    {
      title: 'home',
      url: '/home',
      icon: 'body'
    },
    {
      title: 'fav',
      url: '/mis-personajes',
      icon: 'heart'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private googlePlus: GooglePlus,
    private translate: TranslateService,
    private statusBar: StatusBar,
    private nativeStorage: NativeStorage,
    private router: Router,

  ) {
    this.initializeApp();
    this.langmenu = (environment.defaultLanguage == "es" ? false : true);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.translate.addLangs(environment.currentLanguages);
      if (this.translate.getBrowserLang) {  //if browsers's language is avalaible is set up as default
        if (environment.currentLanguages.includes(this.translate.getBrowserLang())) {
          this.translate.use(this.translate.getBrowserLang());
        }
      }
      //Here we will check if the user is already logged in
      //because we don't want to ask users to log in each time they open the app
      this.nativeStorage.getItem('google_user')
        .then(data => {
          // user is previously logged and we have his data
          // we will let him access the app
          this.router.navigate(["/home"]);
          this.splashScreen.hide();
        }, error => {
          this.router.navigate(["/login"]);
          this.splashScreen.hide();
        });
      this.statusBar.styleDefault();
    });
  }

  doGoogleLogout() {
    this.googlePlus.logout()
      .then(res => {
        //user logged out so we will remove him from the NativeStorage
        this.nativeStorage.remove('google_user');
        this.router.navigate(["/login"]);
      }, err => {
        console.log(err);
      });
  }

  changeLang(e) {
    //console.log(e.detail.checked);
    if (e.detail.checked) {
      this.translate.use("en");
    } else {
      this.translate.use("es");
    }
  }
}
