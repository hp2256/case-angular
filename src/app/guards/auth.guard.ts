import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    loggedIn=false;
  constructor(
      private authService: AuthService,
       private router: Router,   
       private tokenStorageService: TokenStorageService,
    ) { }

  canActivate() {
    if (this.tokenStorageService.getToken()) {
      this.router.navigate(['/staff']);
    }
    return false;
  }
}