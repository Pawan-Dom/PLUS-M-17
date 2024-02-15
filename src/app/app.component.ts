// app.component.ts

import { Component } from '@angular/core';
import { AuthService } from './Services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  isLoggedIn: boolean;
  isSideMenuVisible = false;

  onToggleSideMenu() {
    this.isSideMenuVisible = !this.isSideMenuVisible;
  }

  constructor(private authService: AuthService) {
    // Check the authentication status when the component is initialized
    this.isLoggedIn = this.authService.isAuthenticated();
  }

  // You might also want to subscribe to authentication changes if your AuthService provides an observable

  // ngOnInit() {
  //   this.authService.authStatus.subscribe(isLoggedIn => {
  //     this.isLoggedIn = isLoggedIn;
  //   });
  // }
}
