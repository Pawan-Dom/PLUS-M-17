import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Cities',
      status: false
    },
    children: [
      {
        path: '',
        loadChildren: () => import('./city-list/city-list.module').then(m => m.CityListModule)
    }
    /*,
      {
        path: 'add',
        loadChildren: './customer-add/customer-add.module#CustomerAddModule'
      },
      {
        path: 'edit',
        loadChildren: './customer-edit/customer-edit.module#CustomerEditModule'
      }/*,
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
export class CityRoutingModule { }
