import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TransactionListComponent} from './transaction-list.component';

const routes: Routes = [
  {
    path: '',
    component: TransactionListComponent,
    data: {
      title: 'Transactions ',
      icon: 'ti-widgetized',
      caption: 'All PPL Roles',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionListRoutingModule { }
