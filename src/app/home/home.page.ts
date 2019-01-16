import { Component, OnInit, ViewChild } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { LoadingController, ModalController} from '@ionic/angular';
import { Router } from '@angular/router';
import { PersonajesService } from '../servicios/personajes.service';
import { PersonajePage } from '../personaje/personaje.page';

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
    private googlePlus: GooglePlus,
    private nativeStorage: NativeStorage,
    public loadingController: LoadingController,
    private router: Router,
    public modalController: ModalController
  ) { this.initializeItems(); }

  async ngOnInit() {
    const loading = await this.loadingController.create({
      message: 'Please wait...'
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

   /* Analizar el ciclo de vida de los componentes: justo cuando se hace activa */
   ionViewDidEnter() {
    this.presentLoading("Cargando");
    this.todoS.leePersonaje().subscribe((querySnapshot) => {
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
  doRefresh(refresher) {
    this.todoS.leePersonaje().subscribe(querySnapshot => {
        this.listado = [];
        querySnapshot.forEach((doc) => {
          this.listado.push({ id: doc.id, ...doc.data() });
        });
        this.listadoPanel = this.listado;
        refresher.target.complete();
      });
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
        return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  actualizarPage(){

    this.todoS.leePersonaje().subscribe((querySnapshot) => {
      this.listado = [];
      querySnapshot.forEach((doc) => {
        this.listado.push({ id: doc.id, ...doc.data() });
      });

      this.listadoPanel = this.listado;
      this.loadingController.dismiss();
    });
  }
}
