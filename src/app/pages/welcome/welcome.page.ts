import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from 'src/app/services/supabase';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
  standalone: false   // ← fixes NG6008: keeps it in NgModule

})

export class WelcomePage implements OnInit {

  constructor(
    private router: Router,
    private supabase: SupabaseService
  ) { }

  async ngOnInit() {

    // Show splash screen for 3 seconds
    setTimeout(async () => {

      // Check if user is already logged in
      const { data } =
      await this.supabase.getUser();

      // If logged in → go to home
      if (data.user) {

        this.router.navigate(
          ['/home'],
          { replaceUrl: true }
        );

      }

      // If not logged in → go to login
      else {

        this.router.navigate(
          ['/login'],
          { replaceUrl: true }
        );

      }

    }, 3000);

  }

}
