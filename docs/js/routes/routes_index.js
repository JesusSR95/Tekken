var ROUTES_INDEX = {"name":"<root>","kind":"module","className":"AppModule","children":[{"name":"routes","filename":"src/app/app-routing.module.ts","module":"AppRoutingModule","children":[{"path":"","redirectTo":"login","pathMatch":"full"},{"path":"home","loadChildren":"./home/home.module#HomePageModule","children":[{"kind":"module","children":[],"module":"HomePageModule"}]},{"path":"list","loadChildren":"./list/list.module#ListPageModule","children":[{"kind":"module","children":[],"module":"ListPageModule"}]},{"path":"mis-personajes","loadChildren":"./mis-personajes/mis-personajes.module#MisPersonajesPageModule","children":[{"kind":"module","children":[{"name":"routes","filename":"src/app/mis-personajes/mis-personajes.module.ts","module":"MisPersonajesPageModule","children":[{"path":"","component":"MisPersonajesPage"}],"kind":"module"}],"module":"MisPersonajesPageModule"}]},{"path":"login","loadChildren":"./autentication/login/login.module#LoginPageModule","children":[{"kind":"module","children":[{"name":"routes","filename":"src/app/autentication/login/login.module.ts","module":"LoginPageModule","children":[{"path":"","component":"LoginPage"}],"kind":"module"}],"module":"LoginPageModule"}]},{"path":"personaje","loadChildren":"./personaje/personaje.module#PersonajePageModule","children":[{"kind":"module","children":[{"name":"routes","filename":"src/app/personaje/personaje.module.ts","module":"PersonajePageModule","children":[{"path":"","component":"PersonajePage"}],"kind":"module"}],"module":"PersonajePageModule"}]},{"path":"combos","loadChildren":"./combos/combos.module#CombosPageModule","children":[{"kind":"module","children":[{"name":"routes","filename":"src/app/combos/combos.module.ts","module":"CombosPageModule","children":[{"path":"","component":"CombosPage"}],"kind":"module"}],"module":"CombosPageModule"}]}],"kind":"module"}]}
