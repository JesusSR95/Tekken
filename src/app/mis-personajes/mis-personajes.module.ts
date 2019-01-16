import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MisPersonajesPage } from './mis-personajes.page';

const routes: Routes = [
  {
    path: '',
    component: MisPersonajesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MisPersonajesPage]
})
export class MisPersonajesPageModule {}
