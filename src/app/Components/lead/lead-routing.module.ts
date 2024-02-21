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
        path: '',
        loadChildren: () => import('./lead-list/lead-list.module').then(module => module.LeadListModule)      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeadRoutingModule { }
