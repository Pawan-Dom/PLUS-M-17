import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LicenseListComponent} from './license-list.component';

const routes: Routes = [
  {
    path: '',
    component: LicenseListComponent,
    data: {
      title: 'Licenses ',
      icon: 'ti-widgetized',
      caption: 'All Licenses',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LicenseListRoutingModule { }
