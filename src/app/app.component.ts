import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from './_services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showReceptionistBoard = false;
  showManagerBoard=false;
  username?: string;

  title = 'Hotel Management System';
  constructor(
    private tokenStorageService: TokenStorageService,
    private router:Router,
    private route:ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_OWNER');
      this.showManagerBoard=this.roles.includes('ROLE_MANAGER');
      this.showReceptionistBoard = this.roles.includes('ROLE_RECEPTIONIST');

      this.username = user.username;
      console.log(user);
      
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    
    // this.router.navigate(['login']);
    window.location.reload();
    window.location.replace('/login');
    this.router.navigate(['/login']);
    
  }
}
