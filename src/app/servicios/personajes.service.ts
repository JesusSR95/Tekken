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
    return this.miPersonaje.get();
  }
}
