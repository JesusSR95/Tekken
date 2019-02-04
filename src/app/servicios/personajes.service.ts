import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonajesService {

  miPersonaje: any;

  constructor(private fireStore: AngularFirestore) {
    this.miPersonaje = fireStore.collection<any>(environment.firebaseConfig.personajesColeccion)
  }

  leePersonaje() {
    return this.miPersonaje.ref.orderBy('Nombre', 'asc').get();
  }

  obtenerFavoritos(){
    return this.miPersonaje.ref.where("favorito", "==", true).get();
  }
  updateFavorito(id){
    let data={
      "favorito":true
    }
    return this.miPersonaje.doc(id).update(data);
  }

  deleteFavorito(id){
    let data={
      "favorito":false
    }
    return this.miPersonaje.doc(id).update(data);
  }
}
