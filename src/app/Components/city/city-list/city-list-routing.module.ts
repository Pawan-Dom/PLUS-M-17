import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CityListComponent} from './city-list.component';

const routes: Routes = [
  {
    path: '',
    component: CityListComponent,
    data: {
      title: 'Cities',
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
export class CityListRoutingModule { }
