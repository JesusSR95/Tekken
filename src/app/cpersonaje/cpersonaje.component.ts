import { Component, OnInit, Input } from '@angular/core';
import { LoadingController, NavParams, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { PersonajesService } from '../servicios/personajes.service';

@Component({
  selector: 'app-cpersonaje',
  templateUrl: './cpersonaje.component.html',
  styleUrls: ['./cpersonaje.component.scss']
})

export class CpersonajeComponent implements OnInit {
  @Input() value: number;
  id: any;
  Nombre: any;
  Foto: any;
  Descripcion: any;
  Combo1: any;

  constructor(private todoS: PersonajesService,
    public loadingController: LoadingController,
    private router: Router,
    public modalcontroller: ModalController,
    public navparams: NavParams) {
    this.id = this.navparams.get('id');
    this.Nombre = this.navparams.get('Nombre');
    this.Foto = this.navparams.get('Foto');
    this.Descripcion = this.navparams.get('Descripcion');
    this.Combo1 = this.navparams.get('Combo1');
    console.log(this.id);
  }
  
  ngOnInit() {
  }


}
