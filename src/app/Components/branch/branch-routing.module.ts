import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Branches',
      status: false
    },
    children: [
      {
        path: 'list',
        loadChildren: () => import('./branch-list/branch-list.module').then(m => m.BranchListModule)
      },
      {
        path: 'add',
        loadChildren: () => import('./branch-add/branch-add.module').then(m => m.BranchAddModule)
      },
      {
        path: 'edit',
        loadChildren: () => import('./branch-edit/branch-edit.module').then(m => m.BranchEditModule)
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
export class BranchRoutingModule { }
