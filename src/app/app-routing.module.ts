import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  { 
    path: 'login', 
    loadChildren: './autentication/login/login.module#LoginPageModule' 
  },

  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },

  { 
    path: 'mis-personajes', 
    loadChildren: './mis-personajes/mis-personajes.module#MisPersonajesPageModule' 
  },
  { 
    path: 'personaje', 
    loadChildren: './personaje/personaje.module#PersonajePageModule' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
