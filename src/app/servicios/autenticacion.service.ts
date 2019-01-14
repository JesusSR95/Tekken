import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  constructor(public autService: AutenticacionService,
    public afAuth: AngularFireAuth,
    private activatedRouter: ActivatedRoute) { }

}
