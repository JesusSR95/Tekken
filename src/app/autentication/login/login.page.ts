import { Component } from '@angular/core';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { LoadingController, AlertController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { environment } from './../../../environments/environment';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  /**
   * 
   * @param googlePlus 
   * @param nativeStorage 
   * @param loadingController 
   * @param router 
   * @param platform 
   * @param alertController 
   * @param translate 
   */
  constructor(
    private googlePlus: GooglePlus,
    private nativeStorage: NativeStorage,
    public loadingController: LoadingController,
    private router: Router,
    private platform: Platform,
    public alertController: AlertController,
    private translate: TranslateService
  ) {
    translate.setDefaultLang("es")
  }

  // Inicio de sesion con Google al pulsar el boton inicia del metodo y muestra los correos de google
  // que tenga el movil guardado elegimos el correo que queremos usar y nos llevara al home de la app
  async doGoogleLogin() {
    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    this.presentLoading(loading);
    this.googlePlus.login({
      'scopes': '', // optional - space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
      'webClientId': environment.googleWebClientId, // optional - clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
      'offline': true, // Optional, but requires the webClientId - if set to true the plugin will also return a serverAuthCode, which can be used to grant offline access to a non-Google server
    })
      .then(user => {
        //save user data on the native storage
        this.nativeStorage.setItem('google_user', {
          name: user.displayName,
          email: user.email,
          picture: user.imageUrl
        })
          .then(() => {
            this.router.navigate(["/home"]);
          }, (error) => {
            console.log(error);
          })
        loading.dismiss();
      }, err => {
        console.log(err);
        if (!this.platform.is('cordova')) {
          this.presentAlert();
        }
        loading.dismiss();
      })
  }

  //Este metodo indica que no podemos utilizar el inicio de sesion con google con el ordenador 
  //tendremos que utilizar el movil para que funcione
  async presentAlert() {
    const alert = await this.alertController.create({
      message: 'Cordova is not available on desktop. Please try this in a real device or in an emulator.',
      buttons: ['OK']
    });

    await alert.present();
  }

  /**
   * 
   * @param loading 
   * Nos muestra el cargando al entrar en la app
   */
  async presentLoading(loading) {
    return await loading.present();
  }

}