import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EinvoiceCtListComponent} from './einvoice-ct-list.component';

const routes: Routes = [
  {
    path: '',
    component: EinvoiceCtListComponent,
    data: {
      title: 'Einvoice CT',
      icon: 'ti-widgetized',
      caption: 'Einvoice CT List',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EinvoiceCtListRoutingModule { }
