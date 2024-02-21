import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ApplicationAddComponent} from './application-add.component';

const routes: Routes = [
  {
    path: '',
    component: ApplicationAddComponent,
    data: {
      title: 'Create / Update Quotation ',
      icon: 'ti-widgetized',
      caption: 'Manage PPL Quotations',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationAddRoutingModule { }
