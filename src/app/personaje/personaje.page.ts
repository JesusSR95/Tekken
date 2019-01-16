import { Component, OnInit } from '@angular/core';
import { LoadingController, NavParams, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { PersonajesService } from '../servicios/personajes.service';

@Component({
  selector: 'app-personaje',
  templateUrl: './personaje.page.html',
  styleUrls: ['./personaje.page.scss'],
})
export class PersonajePage implements OnInit {
  id: any;
  
  constructor(private todoS: PersonajesService,
    public loadingController: LoadingController,
    private router: Router,
    public modalcontroller: ModalController) {}

  ngOnInit() {
  }

}
