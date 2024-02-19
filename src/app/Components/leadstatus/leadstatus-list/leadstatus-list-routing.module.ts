import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LeadstatusListComponent} from './leadstatus-list.component';

const routes: Routes = [
  {
    path: '',
    component: LeadstatusListComponent,
    data: {
      title: 'Leadstatuses ',
      icon: 'ti-widgetized',
      caption: 'All PPL Leadstatuses',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeadstatusListRoutingModule { }
