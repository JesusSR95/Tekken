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

  /**
   * 
   * @param todoS 
   * @param loadingController 
   * @param modalController 
   * @param vibration 
   * @param translate 
   */
  constructor(
    private todoS: PersonajesService,
    public loadingController: LoadingController,
    public modalController: ModalController,
    private vibration: Vibration,
    private translate: TranslateService,

  ) {
    this.initializeItems();
    this.color= "#DD2C00";
  }

  //Cargarmos los peronsajes que tenemos añadidos en favoritos
  ngOnInit() {
    this.cargarPersonajesFavoritos();
  }

  initializeItems() {
    this.listadoPanel = this.listado;
  }

  //Mostramos los personajes despues de cargarlos de la base de datos
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

  /**
   * 
   * @param refresher 
   * Refrescamos la pagina para ver si hemos borrado o añadido un personaje nuevo
   */
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

  async presentLoading(msg) {
    let myloading = await this.loadingController.create({
      message: msg
    });
    return await myloading.present();
  }


  /**
   * 
   * @param id 
   * @param Nombre 
   * @param Foto 
   * @param Descripcion 
   * @param Combo1 
   * @param url1 
   * @param url2 
   * @param favorito 
   * Al pulsar el card nos mostrara la informacion del personaje. Recogemos los datos que vamos a mostrar en elmodal
   */
  async modalFav(id: any, Nombre: any, Foto: any, Descripcion: any, Combo1: any, url1: any, url2: any, favorito:true) {
    const modal = await this.modalController.create({
      component: PersonajePage,
      // backdropDismiss:false,
      componentProps: { id: id, Nombre: Nombre, Foto: Foto, Descripcion: Descripcion, Combo1: Combo1, url1: url1, url2: url2, favorito:favorito}
    });    
    return await modal.present();
  }

  /**
   * 
   * @param id 
   * @param Nombre 
   * @param Foto 
   * @param Descripcion 
   * @param Combo1 
   * @param url1 
   * @param url2 
   * @param favorito 
   * Metodo para abrir el modal y que al pulsar el card vibre
   */
  abreModalFav(id, Nombre, Foto, Descripcion, Combo1, url1, url2, favorito) {
    this.vibration.vibrate(50);
    this.modalFav(id, Nombre, Foto, Descripcion, Combo1, url1, url2, favorito)
  }
}
