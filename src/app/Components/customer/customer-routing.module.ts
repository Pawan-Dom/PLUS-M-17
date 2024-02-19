import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Customers',
      status: false
    },
    children: [
      {
        path: 'list',
        loadChildren: () => import('./customer-list/customer-list.module').then(m => m.CustomerListModule)
      },
      {
        path: ':action',
        loadChildren: () => import('./customer-list/customer-list.module').then(m => m.CustomerListModule)
      },
      {
        path: 'edit',
        loadChildren: () => import('./customer-edit/customer-edit.module').then(m => m.CustomerEditModule)
      }
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
export class CustomerRoutingModule { }
