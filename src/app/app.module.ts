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
import { LicensesComponent } from './Components/licenses/licenses.component';
import { MetamasterComponent } from './Components/metamaster/metamaster.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { LoginComponent } from './Components/login/login.component';
import { AppComponent } from './app.component';
import { CityComponent } from './Components/city/city.component';
import { AuthService } from './Services/auth.service';
import { AppRoutingModule } from './app-routing.module'; // Correct import statement
import { NotificationsService } from 'angular2-notifications';
@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        DashboardComponent,
        SideMenuComponent,
        NavBarComponent,
        LicensesComponent,
        MetamasterComponent,
        CityComponent,

    ],
    providers: [
        AuthService,
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
        NgChartsModule,
        NgxChartsModule,
        NgxDatatableModule,
        NgSelectModule,
        SharedModule,
        AppRoutingModule, 
        RouterModule.forRoot([]) 
    ]
})
export class AppModule { }
