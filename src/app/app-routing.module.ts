import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  // First screen when app opens
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },

  // Welcome / Splash Screen
  {
    path: 'welcome',
    loadChildren: () =>
      import('./pages/welcome/welcome.module')
      .then(m => m.WelcomePageModule)
  },

  // Login Page
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module')
      .then(m => m.LoginPageModule)
  },

  // Signup Page
  {
    path: 'signup',
    loadChildren: () =>
      import('./pages/signup/signup.module')
      .then(m => m.SignupPageModule)
  },

  // Main Dashboard / Home
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module')
      .then(m => m.HomePageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    })
  ],

  exports: [RouterModule]
})

export class AppRoutingModule {}