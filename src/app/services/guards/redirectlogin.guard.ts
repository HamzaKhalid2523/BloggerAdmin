import { CanActivate, Router } from '@angular/router';

import { Injectable } from '@angular/core';
import { AuthService } from '../core/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RedirectLoginGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  async canActivate() {
    const token = await this.authService.getFieldDataFromStorage('blogvio-token');
    console.log(token);
    if (token) {
      this.router.navigateByUrl('/home');
  } else {
      return true;
    }
  }
}
