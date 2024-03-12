import { Component, HostListener } from '@angular/core';
import { AuthService } from './Services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isLoggedIn: boolean;
  isSideMenuVisible = false;

  constructor(private authService: AuthService) {
    this.isLoggedIn = this.authService.isAuthenticated();
    // Check viewport width on initialization
    this.checkViewportWidth();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    // Check viewport width when window is resized
    this.checkViewportWidth();
  }

  checkViewportWidth() {
    // Set isSideMenuVisible based on viewport width
    this.isSideMenuVisible = window.innerWidth >= 768; // Adjust breakpoint as needed
  }

  onToggleSideMenu() {
    this.isSideMenuVisible = !this.isSideMenuVisible;
  }
}
