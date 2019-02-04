import { Component, OnInit } from '@angular/core';
import { PersonajesService } from '../servicios/personajes.service';
import { LoadingController, ModalController } from '@ionic/angular';
import { Vibration } from '@ionic-native/vibration/ngx';
import { PersonajePage } from '../personaje/personaje.page';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-mis-personajes',
  templateUrl: './mis-personajes.page.html',
  styleUrls: ['./mis-personajes.page.scss'],
})
export class MisPersonajesPage implements OnInit {

  listado = [];
  listadoPanel = [];

  private color;

  constructor(
    private todoS: PersonajesService,
    public loadingController: LoadingController,
    public modalController: ModalController,
    private vibration: Vibration,
    private translate: TranslateService,

  ) {
    this.initializeItems();
    this.color = "#8d8887";
  }

  ngOnInit() {
    this.cargarPersonajesFavoritos();
  }

  initializeItems() {
    this.listadoPanel = this.listado;
  }

  cargarPersonajesFavoritos() {
    this.presentLoading("Cargando");
    this.todoS.obtenerFavoritos().then((querySnapshot) => {
      this.listado = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        //console.log(doc.id, " => ", doc.data());
        this.listado.push({ id: doc.id, ...doc.data() });
      });
      //console.log(this.listado);
      console.log(this.listado);
      this.listadoPanel = this.listado;
      this.loadingController.dismiss();
    });
  }

    doRefresh(refresher) {
    this.todoS.obtenerFavoritos()
      .then(querySnapshot => {
        this.listado = [];
        querySnapshot.forEach((doc) => {
          this.listado.push({ id: doc.id, ...doc.data() });
        });
        this.listadoPanel = this.listado;
        //llamamos al metodo initializeItem para que recargue 
        //el arraylist con los elementos a buscar
        this.initializeItems();
        refresher.target.complete();
      });
  }

  getColor(){
    return this.color;
  }

  async presentLoading(msg) {
    let myloading = await this.loadingController.create({
      message: msg
    });
    return await myloading.present();
  }

  async modalFav(id: any, Nombre: any, Foto: any, Descripcion: any, Combo1: any, url1: any, url2: any, favorito:true) {
    const modal = await this.modalController.create({
      component: PersonajePage,
      // backdropDismiss:false,
      componentProps: { id: id, Nombre: Nombre, Foto: Foto, Descripcion: Descripcion, Combo1: Combo1, url1: url1, url2: url2, favorito:favorito}
    });    
    return await modal.present();
  }

}
