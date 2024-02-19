import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
 

import {ReportComponent} from './report.component';


const routes: Routes = [
    {
      path: '',
      component: ReportComponent,
      data: {
        title: 'Reports ',
        icon: 'ti-widgetized',
        caption: 'All PPL Reports',
        status: true
      }
    }
  ];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
