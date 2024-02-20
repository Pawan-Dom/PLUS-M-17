import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ApplicationListComponent} from './application-list.component';

const routes: Routes = [
  {
    path: '',
    component: ApplicationListComponent,
    data: {
      title: 'Proforma Invoices ',
      icon: 'ti-widgetized',
      caption: 'All Proforma Invoices',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationListRoutingModule { }
