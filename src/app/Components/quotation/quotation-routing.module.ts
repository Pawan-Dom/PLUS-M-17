import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Applications',
      status: false
    },
    children: [
      {
        path: '',
        loadChildren: () => import('./application-list/application-list.module').then(m => m.ApplicationListModule)
    },
    {
        path: 'dr/:show',
        loadChildren: () => import('./application-list/application-list.module').then(m => m.ApplicationListModule)
    },
    {
        path: 'search/:q',
        loadChildren: () => import('./application-list/application-list.module').then(m => m.ApplicationListModule)
    },
    {
        path: 'atir/:showatir',
        loadChildren: () => import('./application-list/application-list.module').then(m => m.ApplicationListModule)
    },
    {
        path: 'pir/:showpir',
        loadChildren: () => import('./application-list/application-list.module').then(m => m.ApplicationListModule)
    },
    {
        path: 'noc/:shownoc',
        loadChildren: () => import('./application-list/application-list.module').then(m => m.ApplicationListModule)
    },
    {
        path: 'add',
        loadChildren: () => import('./application-add/application-add.module').then(m => m.ApplicationAddModule)
    },
    {
          path: 'add/:type',
          loadChildren: () => import('./application-add/application-add.module').then(m => m.ApplicationAddModule)
    },
    {
       path: 'view/:id/:uuid',
      loadChildren: () => import('./application-add/application-add.module').then(m => m.ApplicationAddModule)
    }
    /*,
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
export class ApplicationRoutingModule { }
