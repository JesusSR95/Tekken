import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { PersonajesService } from '../servicios/personajes.service';
import { LoadingController, ModalController, NavParams, IonSlides, AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CombosPage } from '../combos/combos.page';
import { TranslateService } from '@ngx-translate/core';
//import { Toast } from '@ionic-native/toast';

@Component({
  selector: 'app-personaje',
  templateUrl: './personaje.page.html',
  styleUrls: ['./personaje.page.scss'],
})
export class PersonajePage implements OnInit {
  @ViewChild('SwipedTabsSlider') SwipedTabsSlider: IonSlides;
  @Input() value: number;
  SwipedTabsIndicator: any = null;
  public category: any = "0";
  ntabs = 2;
  id: any;
  Nombre: any;
  Foto: any;
  Descripcion: any;
  Combo1: any;
  url1: any;
  url2: any;
  favorito: any;
  pestaña: any;
  actual: any = 0;

  private color;

  constructor(private todoS: PersonajesService,
    public loadingController: LoadingController,
    private toastController: ToastController,
    public alertController: AlertController,
    private translate: TranslateService,
    private router: Router,
    public modalcontroller: ModalController,
    public navparams: NavParams) {
    this.id = this.navparams.get('id');
    this.Nombre = this.navparams.get('Nombre');
    this.Foto = this.navparams.get('Foto');
    this.Descripcion = this.navparams.get('Descripcion');
    this.Combo1 = this.navparams.get('Combo1');
    this.url1 = this.navparams.get('url1');
    this.url2 = this.navparams.get('url2');
    this.favorito = this.navparams.get('favorito');
    console.log(this.id);

    this.color = "#8d8887";
  }

  ionViewDidEnter() {
    this.SwipedTabsIndicator = document.getElementById("indicator");
}

  ngOnInit() {
  }

  dismiss() {
    this.modalcontroller.dismiss();
  }

  async presentLoading(msg) {
    let myloading = await this.loadingController.create({
      message: msg
    });
    return await myloading.present();
  }

  async abreModal(id: any, Combo1: any) {
    const modal = await this.modalcontroller.create({
      component: CombosPage,
      cssClass: "chico",
      // backdropDismiss:false,
      componentProps: { id: id, Combo1: Combo1 }
    });
    return await modal.present();
  }

  getColor(){
    return this.color;
  }

  updateCat(cat: Promise<any>) {
    cat.then(dat => {
      this.category = dat;
      this.category = +this.category; //to int;
    });
  }

  updateIndicatorPosition() {
    this.SwipedTabsSlider.getActiveIndex().then(i => {
      if (this.ntabs > i) {  // this condition is to avoid passing to incorrect index
        this.SwipedTabsIndicator.style.webkitTransform = 'translate3d(' + (i * 100) + '%,0,0)';
      }
    });
  }

  animateIndicator(e) {
    //console.log(e.target.swiper.progress);
    if (this.SwipedTabsIndicator)
      this.SwipedTabsIndicator.style.webkitTransform = 'translate3d(' +
        ((e.target.swiper.progress * (this.ntabs - 1)) * 100) + '%,0,0)';
  }
  
  async presentToast() {
    this.favorito = !this.favorito;
    this.color = "#DD2C00"
    this.todoS.updateFavorito(this.id);
    const toast = await this.toastController.create({
      message: this.translate.instant("toast"),
      duration: 2000
    });
    toast.present();
  }

  async presentAlertConfirm(id: any) {
    const alert = await this.alertController.create({
      header: this.Nombre,
      message:this.translate.instant("alerta"),
      buttons: [
        {
          text: this.translate.instant("cancelar"),
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text:this.translate.instant("eliminar"),
          handler: () => {
            this.favorito = !this.favorito;
            this.todoS.deleteFavorito(this.id);
            console.log('Confirm Okay');
            this.color = "#8d8887"
          }
        }
      ]
    });
    await alert.present();
  }
}
