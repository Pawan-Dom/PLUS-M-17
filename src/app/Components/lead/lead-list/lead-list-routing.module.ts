import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LeadListComponent } from './lead-list.component';

const routes: Routes = [
  {
    path: '',
    component: LeadListComponent,
    data: {
      title: 'Documents',
      icon: 'ti-widgetized',
      caption: 'All Documents',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeadListRoutingModule { }
