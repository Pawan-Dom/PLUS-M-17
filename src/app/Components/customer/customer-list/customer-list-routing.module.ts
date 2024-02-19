import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CustomerListComponent} from './customer-list.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerListComponent,
    data: {
      title: 'Customers ',
      icon: 'ti-widgetized',
      caption: 'All PPL Customers',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerListRoutingModule { }
