import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Transaction',
      status: false
    },
    children: [
      {
        path: 'list',
        loadChildren: () => import('./transaction-list/transaction-list.module').then(m => m.TransactionListModule)
      },
       {
         path: 'bankstatement',
         loadChildren: () => import('./bankstatement-list/bankstatement-list.module').then(m => m.BankstatementListModule)
      },
      {
        path: 'returntransactions',
        loadChildren: () => import('./returntransaction-list/returntransaction-list.module').then(m => m.ReturnTransactionListModule)
      },

      /*,
      {
        path: 'editable',
        loadChildren: './table-edit/table-edit.module#TableEditModule'
      },
      {
        path: 'row-details',
        loadChildren: './row-details/row-details.module#RowDetailsModule'
      },
      {
        path: 'paging',
        loadChildren: './paging/paging.module#PagingModule'
      },
      {
        path: 'selection',
        loadChildren: './selection/selection.module#SelectionModule'
      }*/
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionRoutingModule { }
