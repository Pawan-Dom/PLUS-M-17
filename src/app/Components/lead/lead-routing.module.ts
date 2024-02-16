import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Documents',
      status: false
    },
    children: [
      {
        path: 'list',
        loadChildren: () => import('./lead-list/lead-list.module').then(m => m.LeadListModule)      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeadRoutingModule { }
