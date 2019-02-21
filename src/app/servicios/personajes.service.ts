import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonajesService {

  miPersonaje: any;
  esFavorito: boolean;

  /**
   * 
   * @param fireStore 
   */
  constructor(private fireStore: AngularFirestore) {
    this.miPersonaje = fireStore.collection<any>(environment.firebaseConfig.personajesColeccion)
  }

  //Metodo que lee los datos de los personajes y lo ordena por nombre y de forma ascendente
  leePersonaje() {
    return this.miPersonaje.ref.orderBy('Nombre', 'asc').get();
  }

  //Metodo que muestra los datos de los personajes pero solo los favoritos
  obtenerFavoritos(){
    return this.miPersonaje.ref.where("favorito", "==", true).get();
  }

  comprobarFavorito(){
    return this.esFavorito;
  }

  //Actualiza los personajes a favoritos
  updateFavorito(id){
    let data={
      "favorito":true
    }
    return this.miPersonaje.doc(id).update(data);
  }

  //Elimina los personajes de favoritos
  deleteFavorito(id){
    let data={
      "favorito":false
    }
    return this.miPersonaje.doc(id).update(data);
  }
}
