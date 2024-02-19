import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'einvoicect',
      status: false
    },
    children: [
      {
        path: '',
        loadChildren: () => import('./einvoice-ct-list/einvoice-ct-list.module').then(m => m.EinvoiceCtListModule)
      }
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EinvoicectRoutingModule { }
