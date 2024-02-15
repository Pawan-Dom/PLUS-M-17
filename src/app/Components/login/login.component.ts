import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent {
  // credentials = { username: '', password: '' };
  credentials = { email: '', password: '' };
  resetCredentials = { email: '' };
  showResetForm = false;

  


  constructor(private authService: AuthService, private snackBar: MatSnackBar, private router: Router) 
 {}

  // login() {
  //   this.authService.login(this.credentials).subscribe(
  //     (response) => {
  //       // Handle successful login response
  //       console.log('Login successful:', response);
  //     },
  //     (error) => {
  //       // Handle login error
  //       console.error('Login error:', error);
  //     }
  //   );
  // }
  login() {

    this.authService.login(this.credentials).subscribe(
      (response) => {
        // Handle successful login response
        console.log('Login successful:', response);
  
        // Show snackbar
        this.snackBar.open('Login successful', 'Close', { duration: 3000 });
           // Navigate to the dashboard
      this.router.navigate(['/lead']);
  
        // You can navigate to another page if needed
        // this.router.navigate(['/dashboard']);
      },
      (error) => {
        // Handle login error
        console.error('Login error:', error);
      }
    );
  }
  resetPassword() {
    // Add logic to handle password reset
    console.log('Password reset requested for email:', this.resetCredentials.email);

    // You can call a service method to handle the reset API call
    // Example: this.authService.resetPassword(this.resetCredentials).subscribe(
    //   (response) => {
    //     // Handle successful password reset response
    //     console.log('Password reset successful:', response);
    //   },
    //   (error) => {
    //     // Handle password reset error
    //     console.error('Password reset error:', error);
    //   }
    // );
  }
  
}
