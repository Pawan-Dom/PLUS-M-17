import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CustomerEditComponent} from './customer-edit.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerEditComponent,
    data: {
      title: 'Edit Customer',
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
export class CustomerEditRoutingModule { }
