import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { LeadComponent } from './Components/lead/lead.component';
import { CityComponent } from './Components/city/city.component'; 

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default route
  { path: 'login', component: LoginComponent },
  { path: 'lead', component: LeadComponent },
  { path: 'user', loadChildren: () => import('./Components/user/user.module').then(m => m.UserModule) },
 {path : 'city', component: CityComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
