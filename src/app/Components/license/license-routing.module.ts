import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Licenses',
      status: false
    },
    children: [
      {
        path: '',
        loadChildren: () => import('./license-list/license-list.module').then(m => m.LicenseListModule)
      },
      
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LicenseRoutingModule { }
