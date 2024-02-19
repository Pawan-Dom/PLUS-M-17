import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BranchAddComponent} from './branch-add.component';

const routes: Routes = [
  {
    path: '',
    component: BranchAddComponent,
    data: {
      title: 'Add Branch',
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
export class BranchAddRoutingModule { }
