import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LicenseCategoryListComponent} from './licensecategory-list.component';

const routes: Routes = [
  {
    path: '',
    component: LicenseCategoryListComponent,
    data: {
      title: 'LicenseCategory ',
      icon: 'ti-widgetized',
      caption: 'All Users of PPL',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LicenseCategoryListRoutingModule { }
