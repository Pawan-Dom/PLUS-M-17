import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { LeadModule } from './Components/lead/lead.module'; 


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default route
  { path: 'login', component: LoginComponent },
  { path: 'user', loadChildren: () => import('./Components/user/user.module').then(m => m.UserModule) },
  { path: 'lead', loadChildren: () => import('./Components/lead/lead.module').then(m => m.LeadModule) },
  { path: 'customer`', loadChildren: () => import('./Components/customer/customer.module').then(m => m.CustomerModule) },
  { path: 'city', loadChildren: () => import('./Components/city/city.module').then(m => m.CityModule) },
  { path: 'metamaster', loadChildren: () => import('./Components/metamaster/metamaster.module').then(m => m.MetamasterModule) },
  { path: 'branch', loadChildren: () => import('./Components/branch/branch.module').then(m => m.BranchModule) },
  { path: 'creditnote', loadChildren: () => import('./Components/creditnote/creditnote.module').then(m => m.CreditnoteModule) },
  { path: 'transaction', loadChildren: () => import('./Components/transaction/transaction.module').then(m => m.TransactionModule) },
  { path: 'einvoicect', loadChildren: () => import('./Components/einvoicect/einvoicect.module').then(m => m.EinvoicectModule) },
  { path: 'report', loadChildren: () => import('./Components/report/report.module').then(m => m.ReportModule) },
  { path: 'leadstatus', loadChildren: () => import('./Components/leadstatus/leadstatus.module').then(m => m.LeadstatusModule) },
  { path: 'quotation', loadChildren: () => import('./Components/quotation/quotation.module').then(m => m.ApplicationModule) },
  { path: 'license', loadChildren: () => import('./Components/license/license.module').then(m => m.LicenseModule) },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)], 
  exports: [RouterModule]
})
export class AppRoutingModule {}
