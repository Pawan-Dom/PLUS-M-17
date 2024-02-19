import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CreditnoteListComponent} from './creditnote-list.component';

const routes: Routes = [
  {
    path: '',
    component: CreditnoteListComponent,
    data: {
      title: 'Credit Notes ',
      icon: 'ti-widgetized',
      caption: 'All Credit Notes',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreditnoteListRoutingModule { }
