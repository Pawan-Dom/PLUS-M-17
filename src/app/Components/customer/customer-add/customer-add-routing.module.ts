import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CustomerAddComponent} from './customer-add.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerAddComponent,
    data: {
      title: 'Add customer',
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
export class CustomerAddRoutingModule { }
