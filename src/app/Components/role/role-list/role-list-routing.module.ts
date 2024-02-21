import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RoleListComponent} from './role-list.component';

const routes: Routes = [
  {
    path: '',
    component: RoleListComponent,
    data: {
      title: 'Roles ',
      icon: 'ti-widgetized',
      caption: 'All PPL Roles',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleListRoutingModule { }
