import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BranchEditComponent} from './branch-edit.component';

const routes: Routes = [
  {
    path: '',
    component: BranchEditComponent,
    data: {
      title: 'Edit Branch',
      icon: 'ti-layers',
      caption: 'lorem ipsum dolor sit amet, consectetur adipisicing elit - form components',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BranchEditRoutingModule { }
