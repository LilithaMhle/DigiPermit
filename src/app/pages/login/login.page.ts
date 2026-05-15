// login.page.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { SupabaseService } from 'src/app/services/supabase';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false   // ← fixes NG6008: keeps it in NgModule
})
export class LoginPage {

  email    = '';
  password = '';
  loading  = false;
  errorMsg = '';

  constructor(
    private router: Router,
    private supabase: SupabaseService,
    private toastCtrl: ToastController
  ) {}

  async login() {
    if (!this.email || !this.password) {
      this.errorMsg = 'Please enter your email and password.';
      return;
    }

    this.loading  = true;
    this.errorMsg = '';

    const { error } = await this.supabase.signIn(this.email, this.password);

    this.loading = false;

    if (error) {
      this.errorMsg = error.message || 'Login failed. Please try again.';
    } else {
      this.router.navigate(['/home'], { replaceUrl: true });
    }
  }

  goToSignup() {
    this.router.navigate(['/signup']);
  }
}
