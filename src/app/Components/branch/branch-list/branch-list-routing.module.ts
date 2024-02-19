import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BranchListComponent} from './branch-list.component';

const routes: Routes = [
  {
    path: '',
    component: BranchListComponent,
    data: {
      title: 'Branch ',
      icon: 'ti-widgetized',
      caption: 'All Users of PPL',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BranchListRoutingModule { }
