import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BankstatementListComponent} from './bankstatement-list.component';

const routes: Routes = [
  {
    path: '',
    component: BankstatementListComponent,
    data: {
      title: 'Bank Statement ',
      icon: 'ti-widgetized',
      caption: 'All Bank Statement',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BankstatementListRoutingModule { }
