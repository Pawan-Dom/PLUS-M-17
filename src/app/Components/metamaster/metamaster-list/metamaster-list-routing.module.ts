import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MetamasterListComponent} from './metamaster-list.component';

const routes: Routes = [
  {
    path: '',
    component: MetamasterListComponent,
    data: {
      title: 'Meta Master List',
      icon: 'ti-widgetized',
      caption: 'All PPL Cities',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MetamasterListRoutingModule { }
