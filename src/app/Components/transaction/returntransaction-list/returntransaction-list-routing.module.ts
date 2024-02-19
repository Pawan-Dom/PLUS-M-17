import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ReturnTransactionListComponent} from './returntransaction-list.component';

const routes: Routes = [
  {
    path: '',
    component: ReturnTransactionListComponent,
    data: {
      title: 'Return Transactions ',
      icon: 'ti-widgetized',
      caption: 'All Return Transactions',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReturnTransactionListRoutingModule { }
