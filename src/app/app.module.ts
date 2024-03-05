import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router'; 
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; 
import { NgChartsModule } from 'ng2-charts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from './shared/shared.module';
import { TokenInterceptor } from './Services/token.interceptor';
import { ErrorInterceptor } from './Services/error.interceptor';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { SideMenuComponent } from './Components/side-menu/side-menu.component';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { LoginComponent } from './Components/login/login.component';
import { AppComponent } from './app.component';
import { AuthService } from './Services/auth.service';
import { AppRoutingModule } from './app-routing.module'; // Correct import statement
import { NotificationsService, SimpleNotificationsModule } from 'angular2-notifications'; // Import SimpleNotificationsModule for options
import { ArchwizardModule } from 'ng2-archwizard/dist';
import { GoogleMapsModule } from '@angular/google-maps';
import { StepperErrorsExampleComponent } from './stepper-errors-example/stepper-errors-example.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { NgOptionHighlightModule } from '@ng-select/ng-option-highlight';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        DashboardComponent,
        SideMenuComponent,
        NavBarComponent,
       
    ],
    providers: [
        NotificationsService, 
        { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatSnackBarModule,
        MatListModule,
        MatIconModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        RouterModule, 
        CommonModule,
        NgbModule,
        MatRadioModule,
        MatInputModule,
        MatIconModule,
        NgChartsModule,
        MatFormFieldModule,
        MatInputModule,
        MatRadioModule,
        MatCheckboxModule,
        MatButtonModule,
        NgxChartsModule,
        NgxDatatableModule,
        NgSelectModule,
        SharedModule,
        AppRoutingModule,
        SimpleNotificationsModule.forRoot() ,
        GoogleMapsModule,
        MatStepperModule,
        NgOptionHighlightModule,
    ]
})
export class AppModule { }
