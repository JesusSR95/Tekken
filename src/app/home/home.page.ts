import { Component, OnInit, ViewChild } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { LoadingController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { PersonajesService } from '../servicios/personajes.service';
import { PersonajePage } from '../personaje/personaje.page';
import { Vibration } from '@ionic-native/vibration/ngx';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('dynamicList') dynamicList;

  user: any;
  userReady: boolean = false;
  listado = [];
  listadoPanel = [];

  constructor(
    private todoS: PersonajesService,
    private nativeStorage: NativeStorage,
    public loadingController: LoadingController,
    private router: Router,
    public modalController: ModalController,
    private translate: TranslateService,
    private vibration: Vibration
  ) {
    this.initializeItems();
    translate.setDefaultLang("es")
  }

  async ngOnInit() {
    // backdropDismiss:false
    const loading = await this.loadingController.create({
    });
    await loading.present();
    this.nativeStorage.getItem('google_user')
      .then(data => {
        this.user = {
          name: data.name,
          email: data.email,
          picture: data.picture,
        };
        this.userReady = true;
        loading.dismiss();
      }, error => {
        console.log(error);
        loading.dismiss();
      });
  }

  /* Analizar el ciclo de vida de los componentes: justo cuando se hace activa */
  ionViewDidEnter() {
    this.presentLoading("Cargando");
    this.todoS.leePersonaje().then((querySnapshot) => {
      this.listado = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        //console.log(doc.id, " => ", doc.data());
        this.listado.push({ id: doc.id, ...doc.data() });
      });
      //console.log(this.listado);
      this.listadoPanel = this.listado;
      this.loadingController.dismiss();
    });
  }
  /* Esta función es llamada por el componente Refresher de IONIC v4 */
  // doRefresh(refresher) {
  //   this.todoS.leePersonaje()
  //     .then(querySnapshot => {
  //       this.listado = [];
  //       this.delete();
  //       querySnapshot.forEach((doc) => {
  //         this.listado.push({ id: doc.id, ...doc.data() });
  //       });
  //       this.listadoPanel = this.listado;
  //       //llamamos al metodo initializeItem para que recargue 
  //       //el arraylist con los elementos a buscar
  //       this.initializeItems();
  //       refresher.target.complete();
  //     });
  // }

  async delete() { //para solucionar el tema de list-items-sliding con ngfor
    await this.dynamicList.closeSlidingItems();
  }

  async presentLoading(msg) {
    let myloading = await this.loadingController.create({
      message: msg
    });
    return await myloading.present();
  }

  initializeItems() {
    this.listadoPanel = this.listado;
  }

  getItems(ev: any) {
    this.initializeItems();
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.listadoPanel = this.listadoPanel.filter((item) => {
        return (item.Nombre.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  actualizarPage() {

    this.todoS.leePersonaje().then((querySnapshot) => {
      this.listado = [];
      querySnapshot.forEach((doc) => {
        this.listado.push({ id: doc.id, ...doc.data() });
      });

      this.listadoPanel = this.listado;
      this.loadingController.dismiss();
    });
  }

  getInitializeItems(ev: any) {
    // resetea todos los items y pone el array de nuevo con todos los elementos
    this.initializeItems();


    // Establece el valor del search bar
    const val = ev.target.value;

    // si esl valor esta vacio no filtra 
    if (val && val.trim() != '') {
      this.listadoPanel = this.listado.filter((item) => {
        console.log(item.Nombre);
        return (item.Nombre.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  async presentModal(id: any, Nombre: any, Foto: any, Descripcion: any, Combo1: any, url1: any, url2: any) {
    const modal = await this.modalController.create({
      component: PersonajePage,
      // backdropDismiss:false,
      componentProps: { id: id, Nombre: Nombre, Foto: Foto, Descripcion: Descripcion, Combo1: Combo1, url1: url1, url2: url2 }
    });
    return await modal.present();
  }

  abreModal(id, Nombre, Foto, Descripcion, Combo1, url1, url2) {
    this.vibration.vibrate(50);
    this.presentModal(id, Nombre, Foto, Descripcion, Combo1, url1, url2)
  }

}
