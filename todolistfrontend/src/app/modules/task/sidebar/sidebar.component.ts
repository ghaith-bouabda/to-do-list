import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../services/services/authentication.service";

@Component({
  selector: 'app-sidebar',
  standalone: false,
  
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  constructor(private router: Router ,private authenticationService: AuthenticationService) {
  }

  logout() {
    this.authenticationService.logout().subscribe({
      next: () => {
        localStorage.clear();
        this.router.navigate(['/login']); // Redirect to login page
      },
      error: (err) => {
        console.error('Logout failed:', err);
      }
    });
  }

}
