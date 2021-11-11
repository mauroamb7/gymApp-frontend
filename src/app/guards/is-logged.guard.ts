import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class IsLoggedGuard implements CanActivate {
  private canActive: boolean = true;

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> | boolean {
    this.authService.isLogged.subscribe((value) => {
      if (value) {
        this.canActive = false;
        this.router.navigateByUrl('/app');
      } else {
        this.canActive = true;
      }
    });

    return this.canActive;
  }
}
