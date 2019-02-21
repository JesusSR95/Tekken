import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { PersonajesService } from '../servicios/personajes.service';
import { LoadingController, AlertController, ModalController, NavParams, IonSlides } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-combos',
  templateUrl: './combos.page.html',
  styleUrls: ['./combos.page.scss'],
})
export class CombosPage implements OnInit {
  @ViewChild('SwipedTabsSlider') SwipedTabsSlider: IonSlides;
  @Input() value: number;
  id: any;
  Combo1: any;

  /**
   * 
   * @param todoS 
   * @param loadingController 
   * @param alertController 
   * @param router 
   * @param modalcontroller 
   * @param navparams 
   */
  constructor(private todoS: PersonajesService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    private router: Router,
    public modalcontroller: ModalController,
    public navparams: NavParams) {
    this.id = this.navparams.get('id');
    this.Combo1 = this.navparams.get('Combo1');
    console.log(this.id);
  }
  
  ngOnInit() {
  }

  /**
   * Al pulsar fuera del modal desaparecerá
   */
  dismiss() {
    this.modalcontroller.dismiss();
  }

}
