import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { LeadModule } from './Components/lead/lead.module'; 


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default route
  { path: 'login', component: LoginComponent },
  { path: 'user', loadChildren: () => import('./Components/user/user.module').then(m => m.UserModule) },
  { path: 'lead', loadChildren: () => import('./Components/lead/lead.module').then(m => m.LeadModule) },



 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], 
  exports: [RouterModule]
})
export class AppRoutingModule {}
